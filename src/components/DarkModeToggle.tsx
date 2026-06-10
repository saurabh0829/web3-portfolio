"use client"

import { useEffect, useState } from "react"

export function DarkModeToggle() {
    const [dark, setDark] = useState(false)

    // On mount -read saved preferences
    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        const isDark = saved === "dark" || (!saved && prefersDark)
        setDark(isDark)
        document.documentElement.classList.toggle("dark", isDark)
    }, [])

    const toggle = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark":"light")
    }

    return (
        <button
            onClick={toggle}
            className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors m-2"
            aria-label="Toggle dark mode"
        >
            {dark ? "Light":"Dark"}
        </button>
    )

}