# Web3 Portfolio Dashboard

A real-time Ethereum portfolio dashboard built with Next.js 15, wagmi, and Alchemy.

## Features

- **Wallet Connect** — Connect any wallet via RainbowKit (MetaMask, Coinbase, WalletConnect, etc.)
- **ENS Resolution** — Search any address or ENS name (e.g. `vitalik.eth`) and resolve it both ways
- **ENS Avatar** — Displays ENS profile avatar with gradient fallback
- **Token Balances** — Live ERC-20 balances (ETH, USDT, USDC, DAI) for any address
- **Transaction History** — Latest 15 transactions (sent + received) via Alchemy, with Etherscan links
- **Network Stats** — Live block number and gas price
- **Dark Mode** — System preference detection + manual toggle, persisted in localStorage
- **Copy Address** — One-click copy of any resolved address to clipboard

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [wagmi v2](https://wagmi.sh/) + [viem](https://viem.sh/)
- [RainbowKit](https://www.rainbowkit.com/)
- [Alchemy SDK](https://www.alchemy.com/)
- [TailwindCSS v4](https://tailwindcss.com/)
- [TanStack Query](https://tanstack.com/query)

## Getting Started

1. Clone the repo
   ```bash
   git clone https://github.com/saurabh0829/web3-portfolio.git
   cd web3-portfolio
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env.local` file
   ```env
   NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
   ```

4. Run the dev server
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_ALCHEMY_API_KEY` | Alchemy API key — get one at [alchemy.com](https://www.alchemy.com/) |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect project ID — get one at [cloud.walletconnect.com](https://cloud.walletconnect.com/) |
