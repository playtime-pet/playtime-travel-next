import { StateGraph } from "@langchain/langgraph";
import { StateAnnotation } from "./state";
import {
    classifyCategory,
    classifyDecision,
    search,
    callModel,
} from "./nodes";

// Create a singleton instance of the workflow
const createWorkflow = () => {
    const workflow = new StateGraph(StateAnnotation)
        .addNode("call_model", callModel)
        .addNode("classify_category", classifyCategory)
        .addNode("search", search)
        .addEdge("__start__", "classify_category")
        .addConditionalEdges("classify_category", classifyDecision)
        .addEdge("search", "__end__")
        .addEdge("call_model", "__end__");

    return workflow.compile();
};

// Export a singleton instance
export const workflowApp = createWorkflow();