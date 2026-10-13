# InkGhost — Setup & Deploy Guide

## Prerequisites

- Node.js 18+
- A wallet with Ink Sepolia ETH (testnet) or Ink ETH (mainnet)
- Free accounts on [Privy](https://privy.io) and [WalletConnect](https://cloud.walletconnect.com)

## 1. Install

```bash
cd inkghost
npm install
```

## 2. Configure Environment

```bash
cp .env.example .env.local
```

Fill in your `.env.local`:

| Variable | Where to get it |
|---|---|
| `PRIVATE_KEY` | Your deployer wallet private key |
| `NEXT_PUBLIC_PRIVY_APP_ID` | Privy dashboard → Create App → App ID |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | cloud.walletconnect.com → New Project → Project ID |
| `NEXT_PUBLIC_NETWORK` | `testnet` (start here) or `mainnet` |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` (dev) or your Vercel URL |

## 3. Deploy Smart Contract

**Testnet first** (recommended):
```bash
npx hardhat run scripts/deploy-testnet.js --network inkSepolia
```

This deploys both the InkGhost contract and a mock USDC token. Copy the printed addresses into `.env.local`:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_MOCK_USDC_ADDRESS=0x...
```

**Mainnet** (when ready):
```bash
npx hardhat run scripts/deploy.js --network ink
```
The mainnet contract uses real USDC.e at `0xF1815bd50389c46847f0Bda824eC8da914045D14`.

## 4. Configure Privy

In your Privy dashboard:
1. Go to **Login Methods** → enable **Email** and **Google**
2. Go to **Embedded Wallets** → set "Create wallet on login" to **Users without wallets**
3. Go to **Chains** → add Ink Sepolia (763373) and/or Ink Mainnet (57073)
4. Go to **Allowed Origins** → add `http://localhost:3000` and your Vercel domain

## 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 6. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_CONTRACT_ADDRESS
vercel env add NEXT_PUBLIC_PRIVY_APP_ID
vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
vercel env add NEXT_PUBLIC_NETWORK
vercel env add NEXT_PUBLIC_APP_URL
# If testnet:
vercel env add NEXT_PUBLIC_MOCK_USDC_ADDRESS

# Redeploy with env vars
vercel --prod
```

Or use the Vercel web dashboard: import the repo, add env vars in Settings → Environment Variables, deploy.

## 7. Test the Flow

1. **Seller**: Connect wallet → Create a payment link → Copy the URL
2. **Buyer (wallet)**: Open link → "Pay with Wallet" → Connect → Approve → Pay
3. **Buyer (email)**: Open link → "Pay with Email" → Sign in → Pay
4. **Seller**: Dashboard shows payment → Withdraw USDC

## Architecture

```
Seller (RainbowKit) ──→ InkGhost Contract ←── Buyer (Privy or Wallet)
        │                    │                        │
   Dashboard            USDC.e / MockUSDC         Pay Page
   (create links,       (0.5% fee,              (wallet OR email,
    withdraw)            instant settlement)      QR code sharing)
```

## Testnet ETH

Get Ink Sepolia ETH from:
- [ink-sepolia.faucet.gelato.digital](https://ink-sepolia.faucet.gelato.digital)
- [Superchain Faucet](https://app.optimism.io/faucet)

## Notes

- v1 uses standard EOA transactions (~$0.001 gas on Ink)
- Paymaster integration (gasless) planned for v2
- The `useSmartAccount` hook is the only file that changes for the v2 upgrade
