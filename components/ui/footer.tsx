'use client'

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const footer = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) return <div className="w-10 h-10" />

    return (
        <div className="flex max-xs:flex-col gap-1 justify-center text-center text-sm text-zinc-500 dark:text-zinc-400 transition-all">
            <div>Use this tool responsibly and ethically.</div>
            <div>
                Made with {theme === "dark" ? "🤍" : "🖤"} by <a className={`${theme ==="dark" ? "text-white" : "text-black"} font-semibold hover:underline`} href="https://t.me/GodLonewolf">Lonewolf</a> 
            </div>
        </div>
    );
};

export default footer;
