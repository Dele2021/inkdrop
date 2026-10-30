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
  address: process.env.NEXT_PUBLIC_USDC_ADDRESS || "0xF1815bd50389c46847f0Bda824eC8da914045D14",
  symbol: "USDC",
  decimals: 6,
};
export const EXPLORER_URL = CHAIN.blockExplorers.default.url;
export const SWAP_ROUTER = process.env.NEXT_PUBLIC_SWAP_ROUTER || "0x3a63171DD9BebF4D07BC782FECC7eb0b890C2A45";
export const SWAP_FACTORY = process.env.NEXT_PUBLIC_SWAP_FACTORY || "0x31832f2a97Fd20664D76Cc421207669b55CE4BC0";
export const WETH_ADDRESS = process.env.NEXT_PUBLIC_WETH_ADDRESS || "0x4200000000000000000000000000000000000006";
export const FEE_BPS = 100; // 100 basis points = 1% — must match contract's feeBps
export const FEE_PERCENT = 1; // human-readable version for UI display
// v1.1
// v1.1
// v1.1
