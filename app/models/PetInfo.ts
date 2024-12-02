import { AppwriteMetadata } from "./AppwriteMetadata";

export interface PetInfo {
    user_id: string;
    id: string;
    name: string;
    age: number;
    size: number;
    type: string; // dog, cat, bird, fish, etc.
    gender: string;
    description: string;
}

export type PetInfoWithMetadata = PetInfo & AppwriteMetadata;

export default function initPetInfo(rawData: PetInfoWithMetadata): PetInfo {
    return {
        type: rawData.type,
        name: rawData.name,
        size: rawData.size,
        user_id: rawData.user_id,
        id: rawData.id,
        age: rawData.age,
        gender: rawData.gender,
        description: rawData.description,
    };
}
