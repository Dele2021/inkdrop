// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MockVelodromeRouter {
    uint256 public constant MOCK_ETH_PRICE_USD = 2000;

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
    ) external returns (uint256[] memory amounts) {
        require(block.timestamp <= deadline, "MockRouter: expired");
        require(routes.length > 0, "MockRouter: empty route");
        IERC20(routes[0].from).transferFrom(msg.sender, address(this), amountIn);
        uint256 outputAmount = (amountIn * MOCK_ETH_PRICE_USD) / 1e12;
        require(outputAmount >= amountOutMin, "MockRouter: insufficient output");
        address outputToken = routes[routes.length - 1].to;
        IERC20(outputToken).transfer(to, outputAmount);
        amounts = new uint256[](routes.length + 1);
        amounts[0] = amountIn;
        amounts[routes.length] = outputAmount;
    }

    function getAmountsOut(
        uint256 amountIn,
        Route[] calldata routes
    ) external pure returns (uint256[] memory amounts) {
        require(routes.length > 0, "MockRouter: empty route");
        amounts = new uint256[](routes.length + 1);
        amounts[0] = amountIn;
        amounts[routes.length] = (amountIn * MOCK_ETH_PRICE_USD) / 1e12;
    }
}
