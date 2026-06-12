"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { WalletInfo } from "../components/WalletInfo";
import { NetworkStats } from "../components/NetworkStats";
import { TokenBalances } from "../components/TokenBalances";
import { AddressSearch } from "../components/AddressSearch";
import { TransactionHistory } from "../components/TransactionHistory";
import { useAccount, useChainId } from "wagmi";
import { useState } from "react";
import { DarkModeToggle } from "../components/DarkModeToggle";
import { PortfolioChart } from "../components/PortfolioChart";
import { useTokenPortfolio } from "../hooks/useTokenPortfolio";
import { useEthPrice } from "../hooks/useEthPrice";
import { LiveFeed } from "../components/LiveFeed";
import { NFTGallery } from "../components/NFTGalllery";

const CHAIN_LABELS: Record<number, { label: string; color: string }> = {
  1:     { label: "Ethereum",  color: "bg-blue-500"   },
  8453:  { label: "Base",       color: "bg-indigo-500" },
  11155111: { label: "Sepolia",  color: "bg-yellow-500" },
};

export default function Home() {
  const { address: connectedAddr } = useAccount();
  const chainId                    = useChainId();
  const [searchedAddr, setSearchedAddr] = useState<`0x${string}` | undefined>();

  const activeAddr  = searchedAddr ?? connectedAddr;
  const chain       = CHAIN_LABELS[chainId] ?? { label: "Unknown", color: "bg-gray-500" };
  const { tokens }  = useTokenPortfolio(activeAddr);
  const ethBalance  = useEthPrice();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* ── Header ── */}
      <header className="border-b bg-white dark:bg-gray-900 px-6 py-3
                          flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-lg">Web3 Dashboard</h1>
          <span className="flex items-center gap-1 text-xs
                          bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
            <span className={`w-2 h-2 rounded-full ${chain.color}`} />
            {chain.label}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <ConnectButton showBalance={false} />
        </div>
      </header>

      {/* ── Body: 2-col on desktop ── */}
      <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* ── LEFT column ── */}
        <div className="space-y-4">
          <AddressSearch onSearch={setSearchedAddr} />
          {!searchedAddr && connectedAddr && <WalletInfo />}
          {activeAddr    && <PortfolioChart tokens={tokens} ethBalance={ethBalance ?? undefined} />}
          <NetworkStats />
          <LiveFeed     />
        </div>

        {/* ── RIGHT column ── */}
        <div className="space-y-4">
          <TokenBalances   address={activeAddr} />
          <NFTGallery         address={activeAddr} />
          <TransactionHistory address={activeAddr} />
        </div>

      </div>

      {/* ── Footer ── */}
      <footer className="text-center py-6 text-xs text-gray-400 border-t mt-8">
        Built by{" "}
        <a href="https://github.com/YOUR_USERNAME"
           className="text-blue-500 hover:underline">Saurabh Sharma
        </a>{" · "}
        <a href="https://github.com/saurabh0829/web3-portfolio"
           className="text-blue-500 hover:underline">Source
        </a>
      </footer>

    </main>
  );
}   