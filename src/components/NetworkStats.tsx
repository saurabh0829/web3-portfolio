"use client";

import {useBlockNumber, useGasPrice} from "wagmi";
import {formatGwei} from "viem";

export function NetworkStats(){
    const {data : blockNumber} = useBlockNumber({watch : true})
    const {data : gasPrice} = useGasPrice();

    return (
        <div className="mt-6 p-6 border rounded-xl max-w-md w-full"> 
            <h2 className="text-xl font-semibold mb-4">Network Stats(Live)</h2>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-500">Current Block</span>
                    <span className="font-mono">
                        {blockNumber ? blockNumber.toString() : "Loading..."}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Gas Price</span>
                    <span className="font-mono">
                        {gasPrice ? `${formatGwei(gasPrice)} gwei` : "Loading..."}
                    </span>
                </div>
            </div>
        </div>
    )
}