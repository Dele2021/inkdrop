"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { CHAIN } from "./config";

// Convert our chain config into a wagmi-compatible chain definition
const inkChain = {
  id: CHAIN.id,
  name: CHAIN.name,
  network: CHAIN.network,
  nativeCurrency: CHAIN.nativeCurrency,
  rpcUrls: CHAIN.rpcUrls,
  blockExplorers: CHAIN.blockExplorers,
  testnet: CHAIN.testnet,
};

export const config = getDefaultConfig({
  appName: "InkDrop",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo",
  chains: [inkChain],
  transports: {
    [inkChain.id]: http(CHAIN.rpcUrls.default.http[0]),
  },
  ssr: true,
});
