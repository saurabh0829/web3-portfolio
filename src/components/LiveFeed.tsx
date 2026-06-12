"use client";

import { useLiveTransfers } from "../hooks/useLiveTransfers";

export function LiveFeed() {
    const { events } = useLiveTransfers();

    return (
        <div className="border rounded-xl overflow-hidden">
            <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b
                      flex items-center justify-between">
                <h3 className="text-xs font-semibold text-gray-500 uppercase">
                    Live Transfers
                </h3>
                <span className="flex items-center gap-1 text-xs text-green-500">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    LIVE
                </span>
            </div>

            {events.length === 0 ? (
                <p className="text-xs text-center text-gray-400 py-6">
                    Waiting for next block
                </p>
            ): (
                    <div>
                        {events.map((e, i)=>(
                            <a 
                            key={e.hash + i}
                            href={`https://etherscan.io.tx/${e.hash}`}
                            target="blank"
                            rel="nooper noreferrer"
                            className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-sm animante-fade-in"
                            >
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${e.token === "USDC" ? "bg-blue-100 text-blue-700":"bg-green-100 text-green-700"}`}>
                                        {e.token}
                                    </span>
                                    <span className="text-xs font-mono text-gray-400">
                                        {e.from.slice(0,6)}...{e.from.slice(-4)}
                                        <span className="text-gray-500 mx-1">→</span>
                                        {e.to.slice(0,6)}...{e.to.slice(-4)}
                                    </span>
                                </div>
                                <span>
                                    ${parseFloat(e.value).toLocaleString("en-US",{
                                        maximumFractionDigits:2
                                    })}
                                </span>
                            </a>
                        ))}
                    </div>
                )
            }
        </div>
    )
}