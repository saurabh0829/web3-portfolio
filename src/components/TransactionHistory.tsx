"use client";

import { useTransactionHistory } from "../hooks/useTransactionHistory";

interface Props {address?: string}

export function TransactionHistory({address}:Props){
    const {transfers, loading, error} = useTransactionHistory(address);

    if(!address) return null;
    if(loading) return <LoadingSkeleton/>
    if(error) return <p className="text-red-500 text-sm">Error : error</p>
    if(!transfers.length) return <p className="text-sm text-gray-400">No transaction found.</p>

    return(
        <div className="w-full max-w-md">
            <h2 className="text-base font-semibold mb-3">
                Recent Transaction
                <span className="ml-2 text-xs text-gray-400 font-normal">(mainnet)</span>
            </h2>

            <div>
                {transfers.map((txn)=>(
                    <a 
                        href={`https://etherscan.io/tx/${txn.hash}`}
                        key={txn.hash}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
                    >
                        {/* Left:direction badge + asset */}
                        <div>
                            <span
                                className={`text-xs font-medium px-2 py-0.5 rounded-full ${txn.direction === 'in' ? 
                                    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                    :"bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                }`}
                            >
                                {txn.direction === "in" ? "IN" : "OUT"}
                            </span>
                            <div>
                                <p className="text-xs font-semibold">
                                    {txn.asset ?? "ETH"}
                                </p>
                                <p className="text-[10px] font-mono text-gray-400">
                                    {txn.hash.slice(0, 10)}...
                                </p>
                            </div>
                        </div>

                        {/* Right amount + counterparty */}
                        <div className="text-right">
                            <p className={`text-xs font-semibold
                                ${txn.direction === "in" ? "text-green-600" : "text-red-500"}`}
                            >
                                {txn.direction === "in" ? "+" : "-"}
                                {txn.value?.toFixed(4) ?? "?"}{txn.asset ?? "ETH"}
                            </p>
                            <p className="text-[10px] font-mono text-gray-400">
                                {txn.direction === "in"
                                    ? `from ${txn.from.slice(0,6)}...${txn.from.slice(-4)}`
                                    : `to ${txn.to?.slice(0,6)}...${txn.to?.slice(-4)}`
                                }
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

function LoadingSkeleton(){
    return (
        <div>
            {Array.from({length:5}).map((_,i)=>(
                <div key={i} className="flex justify-between items-center p-3">
                    <div className="flex gap-2 items-center">
                        <div className="w-10 h-4 bg-gray-200 dark:bg-gray-700 rounded-full"/>
                        <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded"/>
                    </div>
                    <div className="w-20 h-3 bg-gray-200 dark:bg-gray-700 rounded"/>
                </div>
            ))}
        </div>
    )
}