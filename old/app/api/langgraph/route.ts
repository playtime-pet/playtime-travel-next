import { HumanMessage, isAIMessageChunk } from "@langchain/core/messages";
import { workflowApp } from "@utils/langgraph/workflow";
import { requestContext } from "@/app/context/RequestContext";
import { userCache } from "@/app/utils/cache";

export async function POST(req: Request) {
    try {
        const { category, location, message } = await req.json();

        const userId = requestContext.getCurrentUserId();
        if (!userId) {
            return new Response("Unauthorized", { status: 401 });
        }

        const userInfo = userCache.get(userId);
        if (!userInfo) {
            throw new Error("User context not found");
        }

        const petInfo = userCache.get(userInfo.id);

        const stream = new TransformStream({
            async transform(chunk, controller) {
                controller.enqueue(
                    `data: ${JSON.stringify({
                        choices: [{ delta: { content: chunk } }],
                    })}\n\n`
                );
            },
        });

        const writer = stream.writable.getWriter();

        (async () => {
            try {
                // 在调用 workflow 时可以使用上下文信息
                for await (const { event, data } of workflowApp.streamEvents(
                    {
                        category,
                        location,
                        messages: [new HumanMessage(message)],
                        userInfo, // 传入用户信息
                        petInfo, // 传入宠物信息
                    },
                    {
                        version: "v2",
                    }
                )) {
                    console.log(`event: `, event);
                    if (
                        event === "on_chat_model_stream" &&
                        isAIMessageChunk(data.chunk)
                    ) {
                        if (data.chunk.content) {
                            await writer.write(data.chunk.content);
                        }

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
        console.error(error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
