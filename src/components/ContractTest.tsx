"use client";
import { useReadContracts } from "wagmi";
import { erc20ExtendedAbi } from "../lib/abis/erc20-extended";
import { formatUnits } from "viem";


const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7" as const;

export function ContractTest() {
    const { data } = useReadContracts({
        contracts: [
            { address: USDT, abi: erc20ExtendedAbi, functionName: "name" },
            { address: USDT, abi: erc20ExtendedAbi, functionName: "symbol" },
            { address: USDT, abi: erc20ExtendedAbi, functionName: "totalSupply" },
            { address: USDT, abi: erc20ExtendedAbi, functionName: "decimals" },
        ],
    })
    
    if (!data) {
        return <p>Loading contract data...</p>;
    }

    console.log(data);
    
    
    const [name, symbol, supply, decimals] = data;

    if (
        name.status !== "success" ||
        symbol.status !== "success" ||
        supply.status !== "success" ||
        decimals.status !== "success"
    ) {
        return <p>Failed to load contract data</p>;
    }


    return (
        <div className="text-sm space-y-1">
            <p>Name : {name.result as string}</p>
            <p>Symbol: {symbol.result as string}</p>
            <p>Decimals : {Number(decimals.result)}</p>
            <p>Total Supply : {formatUnits(supply?.result as bigint, Number(decimals.result))}</p>
        </div>
    )
}