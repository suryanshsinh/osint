"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return <div className="w-10 h-10" />;

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() =>setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-full transition-all hover:bg-muted active:scale-95"
            aria-label="Toggle theme"
        >
            <Sun
                className={`absolute h-20 w-20 transition-all ${
                    resolvedTheme === "dark"
                        ? "scale-0 rotate-90"
                        : "scale-100 rotate-0"
                }`}
            />
            <Moon
                className={`absolute h-20 w-20 transition-all ${
                    resolvedTheme === "dark"
                        ? "scale-100 rotate-0"
                        : "scale-0 rotate-90"
                }`}
            />
        </Button>
    );
}
