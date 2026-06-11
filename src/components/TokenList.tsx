"use client"

import { useTokenPortfolio } from "../hooks/useTokenPortfolio"
import Image  from "next/image";

export function TokenList({ address }: { address?: string }) {
    const { tokens, loading } = useTokenPortfolio(address)

    if (loading) return <TokenSkeleton />;
    if (!tokens.length) return (
        <p className="text-sm text-gray-400 py-4 text-center">No token Found on this chain</p>
    )

    return (
        <div className="border rounded-xl overflow-hidden">
            <div className="px-4 py-2 border-b bg-gray-50 dark:bg-gray-900">
                <h3 className="text-xs font-semibold text-gray-500 uppercase">
                    Token Holdings ({tokens.length})
                </h3>
            </div>
            <div className="divide-y">
                {tokens.slice(0, 12).map((token) => (
                    <div key={token.contractAddress}
                        className="flex items-center justify-between px-4 py-3"
                    >
                        <div className="flex items-center gap-3">
                            {token.logo ? (
                                <Image
                                    src={token.logo}
                                    alt={token.symbol}
                                    width={28} height={28}
                                    className="ronded-full"
                                />
                            ) : (
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center hustify-center text-[10px] font-bold text-white">
                                    {token.symbol.slice(0, 2)}
                                </div>
                            )}
                            <div >
                                <p className="text-sm font-medium">{token.name}</p>
                                <p className="text-[11px] text-gray-400">{token.name}</p>
                            </div>
                        </div>
                        <p>
                            {parseFloat(token.balances).toFixed(
                                parseFloat(token.balances) < 1 ? 6 : 2
                            )}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

function TokenSkeleton() {
    return (
        <div>
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3">
                    <div className="flex gap-3 items-center">
                        <div className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded-full"/>
                        <div className="w-20 h-3 bg-gray-200 dark:bg-gray-700 rounded"/>
                    </div>
                    <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded"/>
                </div>
            ))}
        </div>
    )
}