import { Query } from "appwrite";
import { appwrite } from "./appwriteService";
import initPetInfo, { PetInfo, PetInfoWithMetadata } from "@models/PetInfo";
import { petCache } from "@/app/utils/cache";

async function list() {
    const result = await appwrite.listDocuments(
        process.env.APPWRITE_DATABSE_ID || "", // databaseId
        process.env.APPWRITE_COLLECTION_PET_INFO || "", // collectionId
        [Query.limit(25)] // queries (optional)
    );

    return result;
}

async function create(data: PetInfo) {
    // const databases = getDatabase();
    const result = await appwrite.createDocument(
        process.env.APPWRITE_DATABSE_ID || "", // databaseId
        process.env.APPWRITE_COLLECTION_PET_INFO || "", // collectionId
        data.id,
        data
    );

    petCache.set(result.$id, data);
    return result;
}

async function get(id: string) {
    if (petCache.has(id)) {
        return petCache.get(id) as PetInfo;
    }

    try {
        const result: PetInfoWithMetadata = await appwrite.getDocument(
            process.env.APPWRITE_DATABSE_ID || "",
            process.env.APPWRITE_COLLECTION_PET_INFO || "",
            id
        );

        const petInfo: PetInfo = initPetInfo(result);
        petCache.set(id, petInfo);
        return petInfo;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const petInfoService = {
    list,
    create,
    get,
};

export default petInfoService;
