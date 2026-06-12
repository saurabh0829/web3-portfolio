"use client";

import { useState } from "react";
import { useWatchContractEvent, useChainId } from "wagmi";
import { erc20Abi, formatUnits, } from "viem";

export interface LiveTransfer{
    hash: string;
    from:string;
    to:string;
    value:string;
    token:string;
    timestamp:number
}

// Watch USDC transfers on mainnet - one of the most active contracts
const USDC  = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" as const;
const USDT  = "0xdAC17F958D2ee523a2206206994597C13D831ec7" as const;

export function useLiveTransfers(){
    const [events, setEvents] = useState<LiveTransfer[]>([])

        //Push new events to front of the array - like unshoft for a real-time feed
        const addEvent = (e:LiveTransfer)=> setEvents((prev)=> [e, ...prev].slice(0, 20)) //keep latest 20

        // Watch USDC Transfer events 
        useWatchContractEvent({
            address:USDC,
            abi:erc20Abi,
            eventName: "Transfer",
            onLogs(logs) {
                console.log("New Log", logs);
                logs.forEach((log)=>{
                    const {from, to, value} = log.args;
                    if(!from || !to || !value) return;
                    addEvent({
                        hash: log.transactionHash ?? "",
                        from:from,
                        to:to,
                        value: formatUnits(value,6), //USDC has 6 decimals
                        token: "USDC",
                        timestamp:Date.now(),
                    })
                })
            }
        })

        // Watch USDT Transfer events
        useWatchContractEvent({
            address:USDT,
            abi:erc20Abi,
            eventName:"Transfer",
            onLogs(logs){
                logs.forEach((log)=>{
                    const{from, to, value} = log.args
                    if(!from || !to || !value) return;
                    addEvent ({
                        hash: log.transactionHash ?? "",
                        from: from, 
                        to : to,
                        value:formatUnits(value, 6), //USDT also 6 decimals
                        token:"USDT",
                        timestamp:Date.now()
                    })
                })
            } 
        })

        return {events};
}