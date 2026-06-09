"use client"

import {ConnectButton, WalletButton} from "@rainbow-me/rainbowkit"
import { WalletInfo } from "../components/WalletInfo";
import { NetworkStats } from "../components/NetworkStats";
import { TokenBalances } from "../components/TokenBalances";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Web3 Portfolio DashBoard</h1>
      <ConnectButton/>
      <WalletInfo/>
      <NetworkStats/>
      <TokenBalances/>
    </main>
  );
}
