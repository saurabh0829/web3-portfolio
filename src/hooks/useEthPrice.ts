"use client";

import { useEffect, useState } from "react";

export function useEthPrice() {
    const [price, setPrice] = useState<number | null>(null)

    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
        .then((r)=>r.json())
        .then((d)=>setPrice(d.ethereum.usd))
        .catch(console.error);
        
    }, [])

    return price
}