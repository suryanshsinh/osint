import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const apiKeywords = {
        discord: "discord",
        email: "holehe",
        minecraft: "minecraft",
        username: "username_lookup"
    }
    const { searchParams } = new URL(req.url);
    const platform = searchParams.get("platform");
    const query = searchParams.get("query");
    if (!platform || !query) {
        return NextResponse.json(
            { error: "Missing platform or query parameter" },
            { status: 400 }
        );
    }
    const apiUrl = `${process.env.BACKEND_SERVER_URL}/${apiKeywords[platform as keyof typeof apiKeywords]}/${query}`;
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            throw new Error(
                `API request failed with status ${response.status}`
            );
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch data" },
            { status: 500 }
        );
    }
}
