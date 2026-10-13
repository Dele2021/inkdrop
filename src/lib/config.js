const INK_SEPOLIA = {
  id: 763373,
  name: "Ink Sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-gel-sepolia.inkonchain.com"] },
  },
  blockExplorers: {
    default: { name: "Ink Explorer", url: "https://explorer-sepolia.inkonchain.com" },
  },
  testnet: true,
};

const INK_MAINNET = {
  id: 57073,
  name: "Ink",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-gel.inkonchain.com"] },
  },
  blockExplorers: {
    default: { name: "Ink Explorer", url: "https://explorer.inkonchain.com" },
  },
  testnet: false,
};

const isTestnet = process.env.NEXT_PUBLIC_NETWORK !== "mainnet";

export const CHAIN = isTestnet ? INK_SEPOLIA : INK_MAINNET;
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
export const DEFAULT_TOKEN = {
  address: process.env.NEXT_PUBLIC_MOCK_USDC_ADDRESS,
  symbol: "USDC",
  decimals: 6,
};
export const EXPLORER_URL = CHAIN.blockExplorers.default.url;
export const SWAP_ROUTER = process.env.NEXT_PUBLIC_SWAP_ROUTER;
export const WETH_ADDRESS = process.env.NEXT_PUBLIC_WETH_ADDRESS || "0x4200000000000000000000000000000000000006";
export const FEE_BPS = 100; // 100 basis points = 1% — must match contract's feeBps
export const FEE_PERCENT = 1; // human-readable version for UI display
