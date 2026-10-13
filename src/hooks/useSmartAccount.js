/**
 * useSmartAccount — Manages the Privy embedded wallet for buyers.
 *
 * WHAT THIS DOES (v1):
 * When a buyer signs in with email/Google, Privy creates an embedded
 * wallet (EOA) for them. This hook wraps it with a clean API for the
 * checkout flow: approveAndPay(), getBalance(), etc.
 *
 * GASLESS STATUS (v1):
 * In v1, the embedded wallet sends standard transactions. These DO
 * require a tiny amount of ETH for gas (~$0.001 on Ink's 1-second blocks).
 * The Ink paymaster integration (ERC-4337 smart accounts) will make these
 * truly gasless in v2. The upgrade path is:
 *
 *   v1 (current): Privy EOA → direct transactions (needs dust ETH)
 *   v2 (next):    Privy EOA → SimpleAccount wrapper → paymaster → gasless
 *
 * The v2 upgrade only changes THIS file — the rest of the app stays the same.
 *
 * WHAT THE BUYER SEES:
 * They sign in with email, click "Pay", and the payment happens.
 * In v1 the seller or app needs to airdrop a tiny ETH amount to cover gas.
 * In v2 even that goes away.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { CHAIN, CONTRACT_ADDRESS, DEFAULT_TOKEN } from "@/lib/config";
import { INKDROP_ABI, ERC20_ABI } from "@/lib/contracts";

// v2 TODO: Import and wire up the paymaster
// import { getViemPaymasterHooks } from "@/lib/paymaster";
// import { signerToSimpleSmartAccount } from "permissionless/accounts";
// import { createSmartAccountClient } from "permissionless";

/**
 * Custom hook that provides the buyer's embedded wallet for payments.
 *
 * Returns:
 * - smartAccountAddress: the wallet address (EOA in v1, smart account in v2)
 * - isReady: true when the wallet is set up and ready to transact
 * - approveAndPay: function to approve USDC + pay a link in one flow
 * - getBalance: function to check USDC balance
 * - gasMode: "standard" (v1) or "gasless" (v2) — lets UI show accurate info
 */
export function useSmartAccount() {
  const { authenticated, user } = usePrivy();
  const { wallets } = useWallets();
  const [smartAccountAddress, setSmartAccountAddress] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [embeddedWallet, setEmbeddedWallet] = useState(null);

  // v1: "standard" (needs gas), v2: "gasless" (paymaster covers gas)
  const gasMode = "standard";

  // Find the Privy embedded wallet from the list of connected wallets
  useEffect(() => {
    if (!authenticated || !wallets.length) {
      setIsReady(false);
      setSmartAccountAddress(null);
      setEmbeddedWallet(null);
      return;
    }

    // The embedded wallet is the one Privy created (not an external wallet)
    const privyWallet = wallets.find(
      (w) => w.walletClientType === "privy"
    );

    if (privyWallet) {
      setEmbeddedWallet(privyWallet);
      setSmartAccountAddress(privyWallet.address);
      setIsReady(true);
    }
  }, [authenticated, wallets]);

  /**
   * Create viem clients from the embedded wallet.
   * These are reused by approveAndPay and getBalance.
   */
  const getClients = useCallback(async () => {
    if (!embeddedWallet) throw new Error("Wallet not ready");

    const provider = await embeddedWallet.getEthereumProvider();

    const chainDef = {
      id: CHAIN.id,
      name: CHAIN.name,
      network: CHAIN.network,
      nativeCurrency: CHAIN.nativeCurrency,
      rpcUrls: CHAIN.rpcUrls,
    };

    const walletClient = createWalletClient({
      account: embeddedWallet.address,
      chain: chainDef,
      transport: custom(provider),
    });

    const publicClient = createPublicClient({
      chain: chainDef,
      transport: http(CHAIN.rpcUrls.default.http[0]),
    });

    return { walletClient, publicClient };
  }, [embeddedWallet]);

  /**
   * Approve the contract to spend USDC, then pay — all in one flow.
   *
   * Steps:
   * 1. Check if approval already exists (skip if yes)
   * 2. Approve the InkDrop contract to transfer USDC
   * 3. Call pay() on the contract
   *
   * Both transactions confirm in ~1 second on Ink.
   */
  const approveAndPay = useCallback(
    async (linkId, amount) => {
      if (!embeddedWallet || !isReady) {
        throw new Error("Wallet not ready");
      }

      const { walletClient, publicClient } = await getClients();

      // Check existing allowance — skip approve if already sufficient
      const currentAllowance = await publicClient.readContract({
        address: DEFAULT_TOKEN.address,
        abi: ERC20_ABI,
        functionName: "allowance",
        args: [embeddedWallet.address, CONTRACT_ADDRESS],
      });

      if (currentAllowance < amount) {
        // Step 1: Approve USDC spending
        const approveHash = await walletClient.writeContract({
          address: DEFAULT_TOKEN.address,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [CONTRACT_ADDRESS, amount],
        });

        // Wait for the approval to confirm (~1 second on Ink)
        await publicClient.waitForTransactionReceipt({ hash: approveHash });
      }

      // Step 2: Pay the link
      const payHash = await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi: INKDROP_ABI,
        functionName: "pay",
        args: [linkId, amount],
      });

      // Wait for payment confirmation
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: payHash,
      });

      return receipt;
    },
    [embeddedWallet, isReady, getClients]
  );

  /**
   * Check the buyer's USDC balance
   */
  const getBalance = useCallback(async () => {
    if (!embeddedWallet) return 0n;

    const { publicClient } = await getClients();

    const balance = await publicClient.readContract({
      address: DEFAULT_TOKEN.address,
      abi: ERC20_ABI,
      functionName: "balanceOf",
      args: [embeddedWallet.address],
    });

    return balance;
  }, [embeddedWallet, getClients]);

  /**
   * Check the buyer's ETH balance (needed for gas in v1)
   */
  const getEthBalance = useCallback(async () => {
    if (!embeddedWallet) return 0n;

    const { publicClient } = await getClients();
    return await publicClient.getBalance({ address: embeddedWallet.address });
  }, [embeddedWallet, getClients]);

  return {
    smartAccountAddress,
    isReady,
    authenticated,
    user,
    approveAndPay,
    getBalance,
    getEthBalance,
    gasMode, // "standard" in v1, "gasless" in v2
    embeddedWallet,
  };
}
