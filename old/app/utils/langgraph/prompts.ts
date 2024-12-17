import { ChatPromptTemplate, PromptTemplate } from '@langchain/core/prompts';


const classifyCategoryPrompt = (question: string) => {
    return PromptTemplate.fromTemplate(`
    你是一个问题分类和信息提取专家，下面是用户提出的问题："{question}"。请严格按照要求完成分类：

    1. 将问题分类到以下类别之一（必须使用英文小写）：
        - restaurant：与餐厅、美食相关
        - hotel：与住宿、酒店相关
        - park：与游玩场所、景点相关
        - other：其他所有类型的问题

    2. 提取位置信息：
        - 如果问题中包含具体位置，返回该位置
        - 如果没有位置信息，必须返回 null（不是字符串"null"）

    示例输入输出：
    问题：在北京有什么好吃的餐厅推荐吗？
    返回：{{"category": "restaurant", "location": "北京"}}

    问题：附近有什么好玩的地方？
    返回：{{"category": "park", "location": null}}

    请严格按照以下 JSON 格式返回，不要包含任何其他内容：
    {{"category": "分类结果", "location": "位置信息"}}
    `).format({ question });
};

const generalPetAssistantPrompt = (question: string) => {
    return ChatPromptTemplate.fromMessages([
        {
            role: 'system',
            content: 'You are an expert in pets and can answer all questions related to pets. Please answer the following question in detail: "{question}". Your answer should cover the following areas:',
        },
        {
            role: 'user',
            content: `Question: "{question}"`,
        },
        {
            role: 'assistant',
            content: `Please answer according to the following categories:

            1. Pet care, health, and grooming (e.g., How to take care of my dog? What should I do if my cat is sick?)
            2. Pet types, breeds, and characteristics (e.g., What are the characteristics of a Golden Retriever? How do I choose the right pet?)
            3. Pet training and behavior (e.g., How to train my dog to sit? My cat is misbehaving, what should I do?)
            4. Pet diet and nutrition (e.g., What food should I feed my dog? Can cats eat human food?)
            5. Pet emotional needs and interaction (e.g., How to increase intimacy with my pet? What should I do if my dog feels lonely?)

            Answer according to the problem. Make sure to include solutions, tips, and preventative measures for the category. Provide a clear and detailed answer.`,
        },
    ]).format({ question });
};

const summarySearchResultPrompt = (input: string) => {
    const formattedRes = ChatPromptTemplate.fromMessages([
        {
            role: 'system',
            content: 'You are an expert in search result analysis and structured information extraction. Below is the text content from some search results: "{input}". Please summarize and extract the information into a JSON list with the following fields:',
        },
        {
            role: 'user',
            content: `Search results: "{input}"`,
        },
        {
            role: 'assistant',
            content: `#### Extraction fields:
            1. "location": The geographical location or region of the place. If no location is mentioned, use "null".
            2. "name": The name of the place or item.
            3. "description": A brief description of the place or item.
            4. "features": The main features or highlights of the place or item, listed as an array.

            #### Output format:
            Please extract the information for each location or item as a JSON object and return them as a JSON array. The format should be:
            [
            {
                "location": "location or region",
                "name": "place or item name",
                "description": "brief description",
                "features": ["feature1", "feature2"]
            },
            ...
            ]`,
        },
    ]).format({ input });

    return formattedRes;
};


export {
    classifyCategoryPrompt,
    generalPetAssistantPrompt,
    summarySearchResultPrompt,
};
