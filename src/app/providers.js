"use client";

/**
 * PROVIDERS — The wrapper that gives the entire app access to wallets.
 *
 * We use TWO wallet systems side by side:
 *
 * 1. RainbowKit (for SELLERS) — The standard "Connect Wallet" button.
 *    Sellers are crypto-native. They have MetaMask, Rabby, etc.
 *    RainbowKit gives them the familiar wallet-connect experience.
 *
 * 2. Privy (for BUYERS) — "Sign in with Email" or Google.
 *    Buyers might have zero crypto experience. Privy creates a
 *    smart wallet for them behind the scenes. They never see the
 *    word "wallet." This is the grandma-friendly path.
 *
 * Both systems share the same wagmi config underneath, so the
 * smart contract interactions work identically regardless of
 * which login method was used.
 */

import { PrivyProvider } from "@privy-io/react-auth";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/lib/wagmi";
import { CHAIN } from "@/lib/config";
import { Toaster } from "react-hot-toast";

import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

export function Providers({ children }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        // ── Login methods ──
        // These are what the BUYER sees when they click "Pay"
        loginMethods: ["email", "google", "wallet"],

        // ── Appearance ──
        appearance: {
          theme: "dark",
          accentColor: "#7c3aed", // matches our ghost-accent purple
        },

        // ── Embedded wallets ──
        // This is the magic: when someone signs in with email/Google,
        // Privy automatically creates a smart wallet for them.
        // They don't need to install anything or understand crypto.
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
          // Only create for users who don't already have a wallet connected
        },

        // ── Supported chains ──
        // Tell Privy about Ink Chain so the embedded wallet works on it
        supportedChains: [
          {
            id: CHAIN.id,
            name: CHAIN.name,
            network: CHAIN.network,
            nativeCurrency: CHAIN.nativeCurrency,
            rpcUrls: CHAIN.rpcUrls,
            blockExplorers: CHAIN.blockExplorers,
          },
        ],
        defaultChain: {
          id: CHAIN.id,
          name: CHAIN.name,
          network: CHAIN.network,
          nativeCurrency: CHAIN.nativeCurrency,
          rpcUrls: CHAIN.rpcUrls,
          blockExplorers: CHAIN.blockExplorers,
        },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: "#7c3aed",
              accentColorForeground: "white",
              borderRadius: "medium",
            })}
          >
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "#1e1b2e",
                  color: "#e2e0ea",
                  border: "1px solid #2d2a3e",
                },
              }}
            />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </PrivyProvider>
  );
}
