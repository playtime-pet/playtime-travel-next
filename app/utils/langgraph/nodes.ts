import { StateAnnotation } from "./state";
import { classifyCategoryPrompt, summarySearchResultPrompt } from "./prompts";
import { getModel } from "./llm";
import { searchTavily } from "@utils/search";

const model = getModel(0, true);

async function search(state: typeof StateAnnotation.State) {
    const searchResponse = await searchTavily(
        `在${state.location}附近${state.category}相关宠物友好的地方`
    );

    const content = searchResponse.results;
    const searchPrompt = await summarySearchResultPrompt(
        JSON.stringify(content, null, 2)
    );
    const response = await model.invoke(searchPrompt);

    state.messages.push(response);
    return state;
}

function classifyDecision(state: typeof StateAnnotation.State) {
    const categorySchema = ["hotel", "restaurant", "park"];
    console.log(state.category);
    if (categorySchema.includes(state.category)) {
        return "search";
    } else {
        return "call_model";
    }
}

async function classifyCategory(state: typeof StateAnnotation.State) {
    const prompt = await classifyCategoryPrompt(state.messages[0].content.toString());

    console.log(`get prompt:`, prompt)

    const functionSchema = {
        name: "classify_question",
        description: "将用户问题分类并提取位置信息",
        parameters: {
            type: "object",
            properties: {
                category: {
                    type: "string",
                    enum: ["restaurant", "hotel", "park", "other"],
                    description: "问题类别",
                },
                location: {
                    type: ["string", "null"],
                    description: "位置信息，如果没有则为 null",
                },
            },
            required: ["category", "location"],
        },
    };

    const response = await model.invoke(prompt, {
        functions: [functionSchema],
        function_call: { name: "classify_question" },
        configurable: {
            thread_id: "1",
            checkpoint_id: "0c62ca34-ac19-445d-bbb0-5b4984975b2a",
        },
    });

    console.log(response);
    const functionResult = response.additional_kwargs.function_call;
    if (!functionResult) {
        throw new Error("No function result");
    }
    const result = JSON.parse(functionResult.arguments);
    state.category = result.category;
    state.location = result.location;

    return state;
}

async function callModel(state: typeof StateAnnotation.State) {
    const messages = state.messages;
    const response = await model.invoke(messages, {
        configurable: {
            thread_id: "1",
            checkpoint_id: "0c62ca34-ac19-445d-bbb0-5b4984975b2a",
        },
    });
    return { messages: [response] };
}

export { search, classifyDecision, classifyCategory, callModel };
