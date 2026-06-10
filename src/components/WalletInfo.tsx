"use client";

import { useState } from "react";
import { useAccount, useBalance, useEnsName } from "wagmi";

export function WalletInfo(){
    const {address, isConnected, chain} = useAccount();
    const {data:balance} = useBalance({address});
    const {data:ensName} = useEnsName({address})

    const [copied, setCopied] = useState(false)

    const copy = ()=>{
        if(!address) return;
        navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(()=>setCopied(false), 200)
    } 

    if(!isConnected) return <p>Connect your Wallet Above</p>

    return(
        <div className="mt-8 p-6 border rounded-xl max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Your Wallet</h2>
            <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                    <span className="text-gray-500">Address : </span>
                    <span className="font-mono">
                        {ensName || `${address?.slice(0, 6)}...${address?.slice(-4)}`}
                    </span>
                </div>

                <button 
                    onClick={copy}
                    className="text-xs text-gray-400 hover:text-600 transition-colors"
                >
                    {copied ? "Copied":ensName ?? `${address?.slice(0,6)}...${address?.slice(-4)}`}
                </button>

                <div className="flex justify-between">
                    <span className=" text-gray-500 ">Balance : </span>
                    <span className="font-semibold">
                        {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`:"Loading"}
                    </span>
                </div>

                <div className="flex justify-between gap-4">
                    <span className=" text-gray-500">Network : </span>
                    <span className="font-semibold">
                        {chain?.name || "Unknown"}
                    </span>
                </div>

            </div>
        </div>
    )

}