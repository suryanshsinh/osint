"use client";

import { X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type DiscordData = {
    date: string;
    discord_id_keyword: string;
    lastip: string;
    no: string;
    username: string;
	error: string;
};

type EmailData = {
    services: string[];
	error: string;
};

type MinecraftData = {
    igns: string[];
    thumbnail: string;
	error: string;
};

type UsernameData = {
    data: Record<string, { details: any[]; url: string }>;
    username: string;
	error: string;
};

type SearchResultsProps = {
    platform: string;
    query: string;
    onClose: () => void;
    hasFetched: React.MutableRefObject<boolean>;
    setHasFetchedWatcher: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchResults({platform, query, onClose, hasFetched, setHasFetchedWatcher}: SearchResultsProps) {
	const {theme} = useTheme();
    const [data, setData] = useState<DiscordData | EmailData | MinecraftData | UsernameData | null>(null);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        setData(null);
        fetch(
            `/api?platform=${platform}&query=${encodeURIComponent(query)}`)
            .then((res) => {
                hasFetched.current = false;
                setHasFetchedWatcher(!hasFetched.current);
                return res.json();
            })
            .then(setData)
            .catch((error) => console.error("Fetch error:", error));
    }, [platform, query]);

    const renderDiscordResults = (data: DiscordData) => {
        if (!data.discord_id_keyword || data?.error) {
            return <p className="border border-red-500 bg-red-100 text-red-500 dark:bg-red-950 p-2 rounded-md">
				An error occured: {data.error ? data.error : "Invalid Discord ID"}
			</p>;
        }
		return <div className="grid grid-cols-2 gap-4 flex-1">
            {Object.entries(data).map(([key, value]) => (
                <div key={key} className="border rounded-md p-3 dark:border-zinc-700">
                    <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        {key}
                    </div>
                    <div className="mt-1 font-medium">{value}</div>
                </div>
            ))}
        </div>
	};

    const renderEmailResults = (data: EmailData, email: string) => {
		let emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!data?.services || data?.error || !emailRegex.test(email)) {
            return <p className="border border-red-500 bg-red-100 text-red-500 dark:bg-red-950 p-2 rounded-md">
				An error occured: {data.error ? data.error : "Invalid email"}
			</p>;
        }
        return (
            <div className="grid gap-4">
                <p className="text-zinc-600 dark:text-zinc-300">
                    Services associated with this email:
                </p>
                <div className="flex flex-wrap gap-2">
                    {data.services.length ? data.services.map((service, index) => (
                        <a
                            key={index}
                            href={`https://${service}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pl-4 pr-3 py-1 rounded-full border-2 border-zinc-300 dark:border-zinc-700 hover:bg-accent transition-all flex items-center gap-1"
                        >
                            {service}
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    )) : <p className="text-zinc-700 dark:text-zinc-300">No services found</p>}
                </div>
            </div>
        );
    };

    const renderMinecraftResults = (data: MinecraftData) => {
        if (!data.igns || data?.error) {
            return <p className="border border-red-500 bg-red-100 text-red-500 dark:bg-red-950 p-2 rounded-md">
				An error occured: {data.error ? data.error : "Invalid Minecraft username"}
			</p>;
        }
        return (
            <div className="flex gap-6">
                <div className="flex-shrink-0">
                    <Image
                        src={data.thumbnail || "/placeholder.svg"}
                        alt="Minecraft Skin"
                        width={128}
                        height={128}
                        className="rounded-md border dark:border-zinc-700"
                    />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                        In-game names
                    </h3>
                    <ul className="space-y-1">
                        {data.igns.length ? data.igns.map((name, index) => (
                            <li key={index} className="text-zinc-700 dark:text-zinc-300">
                                {name}
                            </li>
                        )) : <li className="text-zinc-700 dark:text-zinc-300">User not found</li>}
                    </ul>
                </div>
            </div>
        );
    };

    const renderUsernameResults = (data: UsernameData) => {
        if (!data.data || data?.error) {
            return <p className="border border-red-500 bg-red-100 text-red-500 dark:bg-red-950 p-2 rounded-md">
				An error occured: {data.error ? data.error : "Invalid Discord ID"}
			</p>;
        }
        return (
            <div className="grid gap-4">
                <h3 className="text-lg font-semibold">
                    Username: {data.username}
                </h3>
                <div className="grid gap-2">
                    <p className="text-zinc-600 dark:text-zinc-300">
                        Services associated with this username:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(data.data).map(([service, info], index) => (
                            <a
                                key={index}
                                href={info.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pl-4 pr-3 py-1 rounded-full border-2 border-zinc-300 dark:border-zinc-700 hover:bg-accent transition-all flex items-center gap-1"
                            >
                                {service}
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderResults = () => {
        switch (platform) {
            case "discord":
                return renderDiscordResults(data as DiscordData);
            case "email":
                return renderEmailResults(data as EmailData, query);
            case "minecraft":
                return renderMinecraftResults(data as MinecraftData);
            case "username":
                return renderUsernameResults(data as UsernameData);
            default:
                return <p>No results found</p>;
        }
    };

    return (
        <Card className="w-full mt-6 border dark:border-zinc-800 dark:bg-[rgb(39,39,42,0.5)] shadow-lg flex flex-col gap-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl max-xs:text-lg">
                    Results for {platform}: {query}
                </CardTitle>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="rounded-lg"
                >
                    <X className="h-4 w-4" />
                </Button>
            </CardHeader>
            {data ? <CardContent className="flex">{renderResults()}</CardContent> : <CardContent className="self-center flex gap-4">
			<svg className="w-6 h-6" fill={theme === 'dark' ? "white" : "black"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>
				Please wait a few moments.
			</CardContent>}
        </Card>
    );
}
