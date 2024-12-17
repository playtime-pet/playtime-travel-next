import { z } from "zod";
import { tool } from "@langchain/core/tools";
// import { searchDuckDuckGo } from "../search";

const petInfoTool = tool(
    async ({ category }) => {
        // const response = await searchDuckDuckGo(category);
        // console.log(response);
        const responses = new Map<string, string>([
            [
                "hotel",
                "这是一个宠物友好的酒店，提供专业的宠物服务，包括：\n1. 宠物床位\n2. 宠物食品\n3. 宠物玩具",
            ],
            [
                "restaurant",
                "这是一个宠物友好的餐厅，提供以下服务：\n1. 宠物专区\n2. 宠物餐单\n3. 户外座位",
            ],
            [
                "park",
                "这是一个适合宠物的公园，设施包括：\n1. 宠物活动区\n2. 饮水设施\n3. 清洁站",
            ],
        ]);
        return responses.get(category);
    },
    {
        name: "petInfo",
        description: "Return pet-friendly information based on category",
        schema: z.object({
            category: z
                .string()
                .describe("The category of the pet-friendly place."),
        }),
    }
);

// const summarizeSearchTool = tool(
//     async ({ searchResults }) => {
//         try {
//             // 假设 searchResults 是搜索结果文本
//             const summary = {
//                 locations: [
//                     {
//                         location: "北京朝阳区",
//                         name: "宠物主题咖啡馆",
//                         description: "一个温馨的宠物友好咖啡馆",
//                         features: [
//                             "提供宠物专属餐点",
//                             "室内外宽敞空间",
//                             "专业宠物照护服务",
//                         ],
//                     },
//                     // ... 可以有多个位置
//                 ],
//             };

//             // 返回 JSON 字符串
//             return JSON.stringify(summary);
//         } catch (error) {
//             console.error("Summary generation failed:", error);
//             return JSON.stringify({ error: "处理搜索结果时出错" });
//         }
//     },
//     {
//         name: "summarizeSearch",
//         description:
//             "Summarize and categorize search results into structured format",
//         schema: z.object({
//             searchResults: z
//                 .string()
//                 .describe("The search results to be summarized"),
//         }),
//     }
// );

export { petInfoTool };
