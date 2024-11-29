import { appwrite } from "./appwriteService";
import { UserInfo } from "@models/UserInfo";
import { randomUUID } from "crypto";
import { userCache } from "@/app/utils/cache";
import { AppwriteError } from "@/app/utils/appwrite";
import { Query } from "appwrite";

const generateUUID = () => {
    return randomUUID();
};

async function list() {
    // const databases = getDatabase();

    const result = await appwrite.listDocuments(
        process.env.APPWRITE_DATABSE_ID || "", // databaseId
        process.env.APPWRITE_COLLECTION_USER_INFO || "", // collectionId
        [Query.limit(25)] // queries (optional)
    );

    return result;
}

async function create(data: UserInfo) {
    // const databases = getDatabase();
    const result = await appwrite.createDocument(
        process.env.APPWRITE_DATABSE_ID || "", // databaseId
        process.env.APPWRITE_COLLECTION_USER_INFO || "", // collectionId
        generateUUID(),
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
        const result = await appwrite.getDocument(
            process.env.APPWRITE_DATABSE_ID || "",
            process.env.APPWRITE_COLLECTION_USER_INFO || "",
            id
        );

        const userInfo: UserInfo = {
            id: result.$id,
            name: result.name,
            avatar: result.avatar,
        };
        userCache.set(id, userInfo);
        return userInfo;
    } catch (error) {
        if (error instanceof AppwriteError) {
            return null;
        }
        throw error;
    }
}

const userInfoService = { list, create, get };
export default userInfoService;
