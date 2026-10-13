// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IWETH {
    function deposit() external payable;
    function withdraw(uint256 amount) external;
}

interface IVelodromeRouter {
    struct Route {
        address from;
        address to;
        bool stable;
        address factory;
    }

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        Route[] calldata routes,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function getAmountsOut(
        uint256 amountIn,
        Route[] calldata routes
    ) external view returns (uint256[] memory amounts);
}

contract InkGhost is ReentrancyGuard {
    using SafeERC20 for IERC20;

    struct PaymentLink {
        address seller;
        uint256 amount;
        address token;
        string  title;
        string  description;
        string  imageURI;
        bool    active;
        uint256 totalReceived;
        uint256 paymentCount;
        uint256 createdAt;
    }

    struct Payment {
        bytes32 linkId;
        address buyer;
        uint256 amount;
        uint256 fee;
        uint256 timestamp;
    }

    address public owner;
    address public feeRecipient;
    uint256 public feeBps = 50;
    uint256 public swapSpreadBps = 30;
    uint256 public constant MAX_FEE_BPS = 500;

    address public weth;
    address public swapRouter;
    address public swapFactory;

    mapping(bytes32 => PaymentLink) public links;
    mapping(address => bytes32[]) public sellerLinks;
    mapping(address => mapping(address => uint256)) public balances;
    mapping(bytes32 => Payment[]) public linkPayments;
    mapping(address => uint256) public feeBalances;

    uint256 public linkCount;

    event LinkCreated(bytes32 indexed linkId, address indexed seller, uint256 amount, address token, string title);
    event LinkUpdated(bytes32 indexed linkId, bool active);
    event PaymentReceived(bytes32 indexed linkId, address indexed buyer, uint256 amount, uint256 fee, uint256 timestamp);
    event ETHPaymentReceived(bytes32 indexed linkId, address indexed buyer, uint256 ethAmount, uint256 tokenAmount, uint256 fee, uint256 timestamp);
    event Withdrawal(address indexed seller, address indexed token, uint256 amount);
    event FeeWithdrawal(address indexed token, uint256 amount);
    event FeeUpdated(uint256 newFeeBps);
    event FeeRecipientUpdated(address newRecipient);
    event OwnershipTransferred(address indexed oldOwner, address indexed newOwner);
    event SwapConfigUpdated(address weth, address router, address factory);

    modifier onlyOwner() {
        require(msg.sender == owner, "InkGhost: not owner");
        _;
    }

    constructor(address _feeRecipient, address _weth, address _swapRouter, address _swapFactory) {
        require(_feeRecipient != address(0), "InkGhost: zero feeRecipient");
        require(_weth != address(0), "InkGhost: zero weth");
        owner = msg.sender;
        feeRecipient = _feeRecipient;
        weth = _weth;
        swapRouter = _swapRouter;
        swapFactory = _swapFactory;
    }

    function createLink(uint256 _amount, address _token, string calldata _title, string calldata _description, string calldata _imageURI) external returns (bytes32 linkId) {
        require(_token != address(0), "InkGhost: zero token");
        require(bytes(_title).length > 0, "InkGhost: empty title");
        require(bytes(_title).length <= 100, "InkGhost: title too long");
        require(bytes(_description).length <= 500, "InkGhost: desc too long");

        linkId = keccak256(abi.encodePacked(msg.sender, block.timestamp, linkCount));

        links[linkId] = PaymentLink({
            seller: msg.sender,
            amount: _amount,
            token: _token,
            title: _title,
            description: _description,
            imageURI: _imageURI,
            active: true,
            totalReceived: 0,
            paymentCount: 0,
            createdAt: block.timestamp
        });

        sellerLinks[msg.sender].push(linkId);
        linkCount++;
        emit LinkCreated(linkId, msg.sender, _amount, _token, _title);
    }

    function toggleLink(bytes32 _linkId) external {
        PaymentLink storage link = links[_linkId];
        require(link.seller == msg.sender, "InkGhost: not your link");
        link.active = !link.active;
        emit LinkUpdated(_linkId, link.active);
    }

    function pay(bytes32 _linkId, uint256 _amount) external nonReentrant {
        PaymentLink storage link = links[_linkId];
        require(link.active, "InkGhost: link inactive");
        require(link.seller != address(0), "InkGhost: link not found");

        if (link.amount > 0) {
            require(_amount == link.amount, "InkGhost: wrong amount");
        } else {
            require(_amount > 0, "InkGhost: zero amount");
        }

        uint256 fee = (_amount * feeBps) / 10_000;
        uint256 sellerAmount = _amount - fee;

        IERC20(link.token).safeTransferFrom(msg.sender, address(this), _amount);

        balances[link.seller][link.token] += sellerAmount;
        feeBalances[link.token] += fee;

        link.totalReceived += sellerAmount;
        link.paymentCount++;

        linkPayments[_linkId].push(Payment({
            linkId: _linkId,
            buyer: msg.sender,
            amount: _amount,
            fee: fee,
            timestamp: block.timestamp
        }));

        emit PaymentReceived(_linkId, msg.sender, _amount, fee, block.timestamp);
    }

    function payWithETH(bytes32 _linkId, uint256 _minTokenOut) external payable nonReentrant {
        PaymentLink storage link = links[_linkId];
        require(link.active, "InkGhost: link inactive");
        require(link.seller != address(0), "InkGhost: link not found");
        require(msg.value > 0, "InkGhost: zero ETH");
        require(swapRouter != address(0), "InkGhost: swap not configured");

        IWETH(weth).deposit{value: msg.value}();
        IERC20(weth).approve(swapRouter, msg.value);

        IVelodromeRouter.Route[] memory routes = new IVelodromeRouter.Route[](1);
        routes[0] = IVelodromeRouter.Route({
            from: weth,
            to: link.token,
            stable: false,
            factory: swapFactory
        });

        uint256[] memory amounts = IVelodromeRouter(swapRouter).swapExactTokensForTokens(
            msg.value,
            _minTokenOut,
            routes,
            address(this),
            block.timestamp + 300
        );

        uint256 tokenReceived = amounts[amounts.length - 1];

        if (link.amount > 0) {
            require(tokenReceived >= link.amount, "InkGhost: swap output < link amount");
        }

        uint256 fee = (tokenReceived * feeBps) / 10_000;
        uint256 spread = (tokenReceived * swapSpreadBps) / 10_000;
        uint256 sellerAmount = tokenReceived - fee - spread;

        balances[link.seller][link.token] += sellerAmount;
        feeBalances[link.token] += fee + spread;

        link.totalReceived += sellerAmount;
        link.paymentCount++;

        linkPayments[_linkId].push(Payment({
            linkId: _linkId,
            buyer: msg.sender,
            amount: tokenReceived,
            fee: fee,
            timestamp: block.timestamp
        }));

        emit ETHPaymentReceived(_linkId, msg.sender, msg.value, tokenReceived, fee, block.timestamp);
        emit PaymentReceived(_linkId, msg.sender, tokenReceived, fee, block.timestamp);
    }

    function withdraw(address _token) external nonReentrant {
        uint256 amount = balances[msg.sender][_token];
        require(amount > 0, "InkGhost: nothing to withdraw");
        balances[msg.sender][_token] = 0;
        IERC20(_token).safeTransfer(msg.sender, amount);
        emit Withdrawal(msg.sender, _token, amount);
    }

    function withdrawFees(address _token) external onlyOwner {
        uint256 amount = feeBalances[_token];
        require(amount > 0, "InkGhost: no fees");
        feeBalances[_token] = 0;
        IERC20(_token).safeTransfer(feeRecipient, amount);
        emit FeeWithdrawal(_token, amount);
    }

    function setFeeBps(uint256 _feeBps) external onlyOwner {
        require(_feeBps <= MAX_FEE_BPS, "InkGhost: fee too high");
        feeBps = _feeBps;
        swapSpreadBps = 30; // 0.3% swap spread on ETH payments
        emit FeeUpdated(_feeBps);
    }

    function setSwapSpreadBps(uint256 _bps) external onlyOwner {
        require(_bps <= 100, "InkGhost: spread too high"); // max 1%
        swapSpreadBps = _bps;
    }

    function setFeeRecipient(address _recipient) external onlyOwner {
        require(_recipient != address(0), "InkGhost: zero address");
        feeRecipient = _recipient;
        emit FeeRecipientUpdated(_recipient);
    }

    function setSwapConfig(address _weth, address _router, address _factory) external onlyOwner {
        require(_weth != address(0), "InkGhost: zero weth");
        weth = _weth;
        swapRouter = _router;
        swapFactory = _factory;
        emit SwapConfigUpdated(_weth, _router, _factory);
    }

    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "InkGhost: zero address");
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }

    function getLink(bytes32 _linkId) external view returns (PaymentLink memory) {
        return links[_linkId];
    }

    function getSellerLinks(address _seller) external view returns (bytes32[] memory) {
        return sellerLinks[_seller];
    }

    function getLinkPayments(bytes32 _linkId) external view returns (Payment[] memory) {
        return linkPayments[_linkId];
    }

    function getLinkPaymentCount(bytes32 _linkId) external view returns (uint256) {
        return linkPayments[_linkId].length;
    }
}
