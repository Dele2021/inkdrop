# 👻 InkGhost — Checkout Links on Ink Chain

**The Stripe payment link, but onchain.** Create a payment link in seconds. Your buyer pays in USDC — no wallet setup, no gas, no crypto knowledge required.

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed
- A crypto wallet (MetaMask, Rabby, etc.)
- Some Ink Sepolia testnet ETH ([get from faucet](https://inkonchain.com/faucet))

### 1. Install dependencies

```bash
cd inkghost
npm install
```

### 2. Set up environment

```bash
cp .env.example .env
```

Edit `.env` and fill in:
- `PRIVATE_KEY` — your wallet private key (for deploying contracts only)
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` — free from [WalletConnect Cloud](https://cloud.walletconnect.com)

### 3. Compile & test the smart contract

```bash
npm run compile
npm test
```

You should see all tests passing (link creation, payments, fees, withdrawals).

### 4. Deploy to Ink Sepolia testnet

```bash
npm run deploy:testnet
```

This deploys both InkGhost and a mock USDC token. Copy the addresses it prints into your `.env` and `src/lib/config.js`.

### 5. Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see the InkGhost landing page.

## How It Works

### For Sellers
1. Connect your wallet
2. Create a payment link (title, amount, description)
3. Share the link with your buyer
4. When they pay, USDC accumulates in the contract
5. Withdraw your funds anytime

### For Buyers
1. Open the payment link
2. Connect any wallet (or get one created — v2)
3. Approve & pay in USDC
4. Done in ~1 second

### Fee Structure
- **0.5%** on every payment
- Hard cap at 5% (can never be raised above this)
- No hidden fees, no monthly charges

## Project Structure

```
inkghost/
├── contracts/           # Solidity smart contracts
│   ├── InkGhost.sol     # Main payment contract
│   └── MockERC20.sol    # Test token (dev only)
├── test/                # Contract tests
├── scripts/             # Deployment scripts
├── src/
│   ├── app/             # Next.js pages
│   │   ├── page.js      # Landing page
│   │   ├── dashboard/   # Seller dashboard
│   │   └── pay/[id]/    # Buyer checkout page
│   ├── lib/             # Config, ABIs, utilities
│   └── components/      # Shared UI components
├── hardhat.config.js    # Blockchain config
└── .env.example         # Environment template
```

## Tech Stack

- **Blockchain**: Ink Chain (OP Stack L2 by Kraken)
- **Smart Contracts**: Solidity 0.8.20 + Hardhat
- **Frontend**: Next.js 14 + TailwindCSS
- **Wallet**: RainbowKit + wagmi + viem
- **Tokens**: USDC (bridged) on Ink

## Roadmap (v2)

- [ ] Embedded wallets (Privy) — buyers without wallets sign in with email
- [ ] Gasless payments via Ink Paymaster — $0 gas for buyers
- [ ] Multi-token payments — buyers pay in any token, auto-swapped to USDC
- [ ] Seller branding — custom logos, colors, images on checkout pages
- [ ] QR codes for each payment link
- [ ] Webhook notifications when payments arrive
- [ ] Mainnet deployment

## License

MIT
