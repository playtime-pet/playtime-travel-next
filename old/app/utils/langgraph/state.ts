import { Annotation } from "@langchain/langgraph";
import { BaseMessage } from "@langchain/core/messages";
import { UserInfo } from "@/app/models/UserInfo";
import { PetInfo } from "@/app/models/PetInfo";

const StateAnnotation = Annotation.Root({
    category: Annotation<string>,
    location: Annotation<string>,
    messages: Annotation<BaseMessage[]>({
        reducer: (x, y) => x.concat(y),
        default: () => [],
    }),
    userInfo: Annotation<UserInfo | null>({
        reducer: (x, y) => x || y,
        default: () => null,
    }),
    petInfo: Annotation<PetInfo | null>({
        reducer: (x, y) => x || (y),
        default: () => null,
    }),
});

export { StateAnnotation };
