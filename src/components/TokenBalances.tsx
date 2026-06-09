"use client";

import { useAccount, useReadContracts } from "wagmi";
import { formatUnits } from "viem";
import { erc20Abi } from "viem";

// Well known mainnet token address
const TOKENS = [
    { name: "USDT", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" as `0x${string}`, decimals: 6 },
    { name: "USDC", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" as `0x${string}`, decimals: 6 },
    { name: "DAI", address: "0x6B175474E89094C44Da98b954EedeAC495271d0F" as `0x${string}`, decimals: 18 },
]

export function TokenBalances() {
    const { address, isConnected } = useAccount();
    const { data: balances } = useReadContracts({
        contracts: TOKENS.map((token) => ({
            address: token.address,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [address!]
        })),
        query: { enabled: isConnected }
    })

    if (!isConnected) return null;

    return (
        <div className="mt-6 p-6 border rounded-xl max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Token Balances</h2>
            <div className="space-y-3 text-sm">
                {TOKENS.map((token, i) => (
                    <div key={token.name} className="flex justify-between">
                        <span className="text-gray-500">{token.name}</span>
                        <span className="font-mono">
                            {balances?.[i]?.result
                                ? formatUnits(balances[i].result as bigint, token.decimals)
                                : "0.00"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}