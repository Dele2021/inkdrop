/**
 * PAYMASTER — The gasless transaction engine.
 *
 * WHAT IS A PAYMASTER?
 * Normally, every blockchain transaction costs "gas" — a small fee in ETH.
 * A paymaster is a smart contract that pays that gas fee on behalf of the user.
 * Ink Chain has a public paymaster that reimburses gas costs from supported
 * stablecoins (USDC, USDT, USDG) so the buyer never needs to hold ETH.
 *
 * HOW IT WORKS (simplified):
 * 1. The buyer's smart wallet creates a "UserOperation" (an ERC-4337 concept —
 *    think of it as a "transaction request" that a smart wallet can process)
 * 2. We ask the paymaster "how much would gas cost for this operation?"
 * 3. The paymaster returns a signed quote
 * 4. The smart wallet sends the operation with the quote attached
 * 5. The paymaster pays the ETH gas and gets reimbursed a tiny amount of USDC
 *
 * For the buyer, this means: they see "$0 gas" and it just works.
 *
 * TECHNICAL NOTE:
 * The Ink Paymaster SDK (@hellomoon/ink-paymaster) wraps all of this.
 * It provides hooks that plug into viem's bundler client, so we don't
 * need to manually manage quotes, signatures, or gas estimation.
 */

import {
  createInkPublicPaymasterClient,
  createInkViemPaymaster,
  INK_PUBLIC_PAYMASTER,
  INK_PUBLIC_PAYMASTER_V08,
} from "@hellomoon/ink-paymaster";
import { createPublicClient, http } from "viem";
import { CHAIN } from "./config";

// Which paymaster version to use
// v0.7 = more widely supported, v0.8 = newer with some improvements
const PAYMASTER_CONFIG = {
  // Testnet uses v0.7 for broader compatibility
  testnet: INK_PUBLIC_PAYMASTER,
  // Mainnet can use either — we'll start with v0.7
  mainnet: INK_PUBLIC_PAYMASTER,
};

const isTestnet = process.env.NEXT_PUBLIC_NETWORK !== "mainnet";
const paymasterConstants = isTestnet
  ? PAYMASTER_CONFIG.testnet
  : PAYMASTER_CONFIG.mainnet;

/**
 * Create the paymaster client.
 * This talks to Ink's public paymaster and handles:
 * - Requesting gas quotes
 * - Validating responses
 * - Formatting the paymaster data for UserOperations
 */
export function getPaymasterClient() {
  const publicClient = createPublicClient({
    chain: {
      id: CHAIN.id,
      name: CHAIN.name,
      network: CHAIN.network,
      nativeCurrency: CHAIN.nativeCurrency,
      rpcUrls: CHAIN.rpcUrls,
    },
    transport: http(CHAIN.rpcUrls.default.http[0]),
  });

  return createInkPublicPaymasterClient(publicClient);
}

/**
 * Get the viem-compatible paymaster hooks.
 *
 * These hooks plug directly into viem's bundler client:
 * - `getPaymasterData` — called automatically when sending a UserOperation
 * - `getPaymasterStubData` — called during gas estimation
 *
 * You pass this to the bundler client config and everything
 * happens automatically. The buyer doesn't see any of it.
 */
export function getViemPaymasterHooks() {
  const paymasterClient = getPaymasterClient();
  return createInkViemPaymaster(paymasterClient);
}

/**
 * USDC token address used for gas reimbursement.
 * The paymaster pays gas in ETH and takes a tiny USDC amount as reimbursement.
 * This comes from the buyer's USDC payment — they don't need separate USDC for gas.
 */
export const PAYMASTER_USDC_ADDRESS = isTestnet
  ? "" // Testnet: set after deploying mock USDC
  : "0xF1815bd50389c46847f0Bda824eC8da914045D14"; // Mainnet USDC.e

/**
 * EntryPoint contract addresses — these are the ERC-4337 "routers"
 * that process UserOperations. Every smart wallet transaction goes through here.
 */
export const ENTRYPOINT = {
  v07: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
  v08: "0x4337084D9E255Ff0702461CF8895CE9E3b5Ff108",
};
