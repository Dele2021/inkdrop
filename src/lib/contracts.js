export const INKDROP_ABI = [
  {
    name: "createLink",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_amount", type: "uint256" },
      { name: "_token", type: "address" },
      { name: "_title", type: "string" },
      { name: "_description", type: "string" },
      { name: "_imageURI", type: "string" },
    ],
    outputs: [{ name: "linkId", type: "bytes32" }],
  },
  {
    name: "toggleLink",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_linkId", type: "bytes32" }],
    outputs: [],
  },
  {
    name: "pay",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_linkId", type: "bytes32" },
      { name: "_amount", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "payWithETH",
    type: "function",
    stateMutability: "payable",
    inputs: [
      { name: "_linkId", type: "bytes32" },
      { name: "_minTokenOut", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "withdraw",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_token", type: "address" }],
    outputs: [],
  },
  {
    name: "getLink",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "_linkId", type: "bytes32" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "seller", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "token", type: "address" },
          { name: "title", type: "string" },
          { name: "description", type: "string" },
          { name: "imageURI", type: "string" },
          { name: "active", type: "bool" },
          { name: "totalReceived", type: "uint256" },
          { name: "paymentCount", type: "uint256" },
          { name: "createdAt", type: "uint256" },
        ],
      },
    ],
  },
  {
    name: "getSellerLinks",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "_seller", type: "address" }],
    outputs: [{ name: "", type: "bytes32[]" }],
  },
  {
    name: "getLinkPayments",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "_linkId", type: "bytes32" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "linkId", type: "bytes32" },
          { name: "buyer", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "fee", type: "uint256" },
          { name: "timestamp", type: "uint256" },
        ],
      },
    ],
  },
  {
    name: "getLinkPaymentCount",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "_linkId", type: "bytes32" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "linkCount",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "balances",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "feeBps",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "weth",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    name: "swapRouter",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
];

export const ERC20_ABI = [
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    name: "allowance",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "decimals",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
];

export const VELODROME_ROUTER_ABI = [
  {
    name: "getAmountsOut",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "amountIn", type: "uint256" },
      {
        name: "routes",
        type: "tuple[]",
        components: [
          { name: "from", type: "address" },
          { name: "to", type: "address" },
          { name: "stable", type: "bool" },
          { name: "factory", type: "address" },
        ],
      },
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }],
  },
];
