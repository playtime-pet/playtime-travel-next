import { appwrite } from "./appwriteService";
import { UserInfo } from "@models/UserInfo";
import { userCache } from "@/app/utils/cache";
import { Query } from "appwrite";
import initUserInfo, { UserInfoWithMetadata } from "@models/UserInfo";

async function list() {
    // const databases = getDatabase();

    const result = await appwrite.listDocuments(
        process.env.APPWRITE_DATABSE_ID || "", // databaseId
        process.env.APPWRITE_COLLECTION_USER_INFO || "", // collectionId
        [Query.orderDesc("name")] // queries (optional)
    );

    return result;
}

async function create(data: UserInfo) {
    // const databases = getDatabase();
    const result = await appwrite.createDocument(
        process.env.APPWRITE_DATABSE_ID || "", // databaseId
        process.env.APPWRITE_COLLECTION_USER_INFO || "", // collectionId
        data.id,
        data
    );

    userCache.set(result.$id, data);
    return result;
}

async function get(id: string) {
    if (userCache.has(id)) {
        return userCache.get(id);
    }

    try {
        const result: UserInfoWithMetadata = await appwrite.getDocument(
            process.env.APPWRITE_DATABSE_ID || "",
            process.env.APPWRITE_COLLECTION_USER_INFO || "",
            id
        );

        const userInfo: UserInfo = initUserInfo(result);
        userCache.set(id, userInfo);

        return userInfo;
    } catch (error) {
        if (error instanceof Error) {
            return null;
        }
        throw error;
    }
}

const userInfoService = { list, create, get };
export default userInfoService;
