"use client";

import type React from "react";

import { useRef, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SearchResults from "@/components/search-results";

export default function OsintSearch() {
    const [query, setQuery] = useState("");
    const [platform, setPlatform] = useState("email");
    const [selectedPlatform, setSelectedPlatform] = useState(platform);
    const [showResults, setShowResults] = useState(false);
    const [searched, setSearched] = useState("");
    const hasFetched = useRef(true);
    const [hasFetchedWatcher, setHasFetchedWatcher] = useState(hasFetched.current);

    const placeholders = {
        email: "Enter an email (eg. lone@wolf.com)",
        username: "Enter a username (eg. lonewolf)",
        discord: "Enter a Discord ID (eg. 771665370754056202)",
        minecraft: "Enter a Minecraft username (eg. lonewolf)",
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searched === query && platform === selectedPlatform) return;
        hasFetched.current = false;
        setHasFetchedWatcher(hasFetched.current);
        setShowResults(false);
        setSearched(query);
        setSelectedPlatform(platform);
        setShowResults(true);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
                <div className="flex w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-md bg-white dark:bg-zinc-800">
                    <div className="flex-grow">
                        <Input
                            type="text"
                            placeholder={placeholders[platform as keyof typeof placeholders]}
                            value={query}
                            required
                            onChange={(e) => setQuery(e.target.value)}
                            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none h-12 text-base bg-transparent px-5"
                        />
                    </div>
                    <div className="max-xs:hidden border-l border-r border-zinc-200 dark:border-zinc-700 transition-all dark:bg-zinc-800 dark:hover:bg-zinc-700 bg-zinc-50 hover:bg-zinc-100">
                        <Select value={platform} onValueChange={setPlatform}>
                            <SelectTrigger className="border-0 focus:ring-0 rounded-none h-12 w-[130px] bg-transparent">
                                <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-zinc-800 dark:border-zinc-700">
                                <SelectItem value="email" className="cursor-pointer">Email</SelectItem>
                                <SelectItem value="username" className="cursor-pointer">Username</SelectItem>
                                <SelectItem value="discord" className="cursor-pointer">Discord</SelectItem>
                                <SelectItem value="minecraft" className="cursor-pointer">Minecraft</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
					<div className="max-xs:hidden">
						<Button
							type="submit"
							disabled={!hasFetchedWatcher}
							className="rounded-none h-12 px-4 duration-200 active:scale-95 bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-50 dark:hover:bg-zinc-100"
						>
							<Search className="h-5 w-5 dark:text-black text-white" />
							<span className="sr-only">Search</span>
						</Button>
					</div>
                </div>
				
                <div className="xs:hidden flex rounded-lg overflow-hidden shadow-md bg-white dark:bg-zinc-800 ml-auto">
                    <div className="border-r border-zinc-200 dark:border-zinc-700 transition-all dark:bg-zinc-800 dark:hover:bg-zinc-700 bg-zinc-50 hover:bg-zinc-100">
                        <Select value={platform} onValueChange={setPlatform}>
                            <SelectTrigger className="border-0 focus:ring-0 rounded-none h-12 w-[130px] bg-transparent">
                                <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-zinc-800 dark:border-zinc-700">
                                <SelectItem value="email" className="cursor-pointer">Email</SelectItem>
                                <SelectItem value="username" className="cursor-pointer">Username</SelectItem>
                                <SelectItem value="discord" className="cursor-pointer">Discord</SelectItem>
                                <SelectItem value="minecraft" className="cursor-pointer">Minecraft</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button
                        type="submit"
                        disabled={!hasFetchedWatcher}
                        className="rounded-none h-12 px-4 duration-200 active:scale-95 bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-50 dark:hover:bg-zinc-100"
                    >
                        <Search className="h-5 w-5 dark:text-black text-white" />
                        <span className="sr-only">Search</span>
                    </Button>
                </div>
            </form>

            {showResults && (
                <SearchResults
                    platform={selectedPlatform}
                    query={searched}
                    onClose={() => {
                        setShowResults(false);
                        setSearched("");
                    }}
                    hasFetched={hasFetched}
                    setHasFetchedWatcher={setHasFetchedWatcher}
                />
            )}
        </>
    );
}
