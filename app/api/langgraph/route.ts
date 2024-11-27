import { HumanMessage, isAIMessageChunk } from "@langchain/core/messages";
import { StateGraph } from "@langchain/langgraph";
import { StateAnnotation } from "@utils/langgraph/state";
import {
    classifyCategory,
    classifyDecision,
    search,
    callModel,
} from "@utils/langgraph/nodes";


export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        const workflow = new StateGraph(StateAnnotation)
            .addNode("call_model", callModel)
            .addNode("classify_category", classifyCategory)
            .addNode("search", search)
            .addEdge("__start__", "classify_category")
            .addConditionalEdges("classify_category", classifyDecision)
            .addEdge("search", "__end__")
            .addEdge("call_model", "__end__");

        // const checkpointer = new MemorySaver();
        // const app = workflow.compile({ checkpointer });
        const app = workflow.compile();

        // 创建一个 TransformStream 来处理数据
        const stream = new TransformStream({
            async transform(chunk, controller) {
                // 将数据包装成 SSE 格式
                controller.enqueue(
                    `data: ${JSON.stringify({
                        choices: [{ delta: { content: chunk } }],
                    })}\n\n`
                );
            },
        });

        const writer = stream.writable.getWriter();

        // 异步处理流式事件
        (async () => {
            try {
                for await (const { event, data } of app.streamEvents(
                    {
                        messages: [new HumanMessage(message)],
                    },
                    {
                        version: "v2",
                    }
                )) {
                    console.log(`event: `, event);
                    if (
                        event === "on_chat_model_stream" &&
                        // metadata.langgraph_node === "call_model"
                        isAIMessageChunk(data.chunk)
                    ) {
                        // 处理普通文本内容
                        if (data.chunk.content) {
                            await writer.write(data.chunk.content);
                        }

                        // 处理工具调用（如果有）
                        if (
                            data.chunk.tool_call_chunks &&
                            data.chunk.tool_call_chunks.length > 0
                        ) {
                            await writer.write(
                                JSON.stringify(data.chunk.tool_call_chunks)
                            );
                        }
                    }
                }
            } catch (error) {
                console.error("Error in workflow:", error);
                await writer.abort(error as Error);
            } finally {
                await writer.close();
            }
        })();

        return new Response(stream.readable, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            },
        });
    } catch (error) {
        console.error(error)
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
