"use client"

import { ConnectButton, WalletButton } from "@rainbow-me/rainbowkit"
import { WalletInfo } from "../components/WalletInfo";
import { NetworkStats } from "../components/NetworkStats";
import { TokenBalances } from "../components/TokenBalances";
import EnsAvatarCard from "../components/Avatar";
import { AddressSearch } from "../components/AddressSearch";
import { TransactionHistory } from "../components/TransactionHistory";
import { useAccount } from "wagmi";
import { useState } from "react";
import { DarkModeToggle } from "../components/DarkModeToggle";

export default function Home() {

  const { address: connectedAddress } = useAccount()

  // SEarched address overrides connected wallet - or fall back to connected wallet
  const [searchedAddress, setSearchedAddress] = useState<`0x${string}` | undefined>();
  const activeAddress = searchedAddress ?? connectedAddress

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
        <DarkModeToggle/>
      <div className="max-w-md mx-auto flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">Web3 Dashboard</h1>
        <ConnectButton showBalance={false} />
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* Search — passes setter down */}
        <AddressSearch onSearch={setSearchedAddress} />

        {/* Show connected wallet info only if not searching */}
        {!searchedAddress && connectedAddress && <WalletInfo />}

        {/* Active address stats */}
        {activeAddress && (
          <>
            <TokenBalances address={activeAddress} />
            <TransactionHistory address={activeAddress} />
          </>
        )}

        {/* Always visible */}
        <NetworkStats />
      </div>
    </main>
  );
}
