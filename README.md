# Web3 Portfolio Dashboard

> A multi-chain Ethereum portfolio tracker — search any wallet,
> view live token balances, NFT gallery, real-time transfer feed,
> and transaction history. Deployed on Vercel.

## 🌐 Live Demo
[your-app.vercel.app](https://web3-portfolio-beta.vercel.app/)

## 🎥 Demo Video
[loom-link — 60 second walkthrough]

## ✨ Features
- **Wallet Connect** — MetaMask, Coinbase, WalletConnect via RainbowKit
- **Address Search** — look up any address or ENS name (vitalik.eth)
- **Multi-chain** — Ethereum Mainnet, Base L2, Sepolia testnet
- **Token Balances** — all ERC-20 tokens with logos via Alchemy
- **NFT Gallery** — grid view with hover overlay, links to OpenSea
- **Transaction History** — sent + received, paginated, chain-aware
- **Live Transfer Feed** — real-time USDC/USDT events via WebSocket
- **Portfolio Chart** — token distribution pie chart (Recharts)
- **ENS Resolution** — forward (name → address) and reverse
- **Dark mode** + responsive layout

## 🛠 Tech Stack
| Layer       | Technology                        |
|-------------|-----------------------------------|
| Framework   | Next.js 14 (App Router)           |
| Styling     | Tailwind CSS                      |
| Wallet      | wagmi v2 + viem + RainbowKit      |
| Blockchain  | Alchemy SDK (transfers, NFTs)     |
| Charts      | Recharts                          |
| Deploy      | Vercel                            |

## 💡 What I Learned
- ABIs are like OpenAPI specs for smart contracts
- wagmi hooks = React Query but for blockchain data
- useWatchContractEvent = WebSocket subscriptions on-chain
- Multi-chain apps just need a chain-aware client factory
- ENS resolves both ways: address ↔ human-readable name

## 🚀 Running Locally
```bash
git clone https://github.com/saurabh0829/web3-portfolio
cd web3-portfolio
npm install
cp .env.example .env.local   # add your Alchemy + WalletConnect keys
npm run dev
```