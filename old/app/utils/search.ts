import { tavily } from "@tavily/core";
async function searchDuckDuckGo(query: string) {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(
        query
    )}&format=json&no_redirect=1&t=h_`;
    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(
                `DuckDuckGo API request failed: ${response.statusText}`
            );
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching DuckDuckGo data:", error);
        throw error;
    }
}

async function searchTavily(query: string, maxResults: number = 5) {
    const tvly = tavily({
        apiKey: process.env.TAVILY_API_KEY,
    });

    const results = await tvly.search(query, {
        searchDepth: "basic",
        maxResults: maxResults,
        includeImages: false,
        includeRawContent: true,
    });
    console.log(results);

    return results;
}

export { searchDuckDuckGo, searchTavily };
