"use client";

import { darkTheme, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./config/wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

export function Providers({children}:{children:React.ReactNode}){

    const [isDark, setIsDark] = useState(false)

    useEffect(()=>{
        // Watch for class changes on html
        const observer = new MutationObserver(()=>{
            setIsDark(document.documentElement.classList.contains("dark"))
        })
        observer.observe(document.documentElement,{
            attributes:true,
            attributeFilter:["class"]
        });
        // Set initial value
        setIsDark(document.documentElement.classList.contains("dark"))
        return ()=>observer.disconnect()
    },[])

    return(
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={isDark ? darkTheme() : lightTheme()}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}