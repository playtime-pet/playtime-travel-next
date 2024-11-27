import { ChatOpenAI } from "@langchain/openai";

function getModel(temperature: number, streaming: boolean) {
    return new ChatOpenAI({
        model: process.env.LLM_MODEL,
        temperature: temperature,
        maxRetries: 2,
        streaming: streaming,
        configuration: {
            apiKey: process.env.LLM_API_KEY,
            baseURL: process.env.LLM_URL,
        },
    });
}

export { getModel };
