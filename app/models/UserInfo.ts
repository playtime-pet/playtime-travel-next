import { AppwriteMetadata } from "./AppwriteMetadata";

export interface UserInfo {
    id: string;
    name: string;
    avatar: string;
}

export type UserInfoWithMetadata = UserInfo & AppwriteMetadata;

export default function initUserInfo(rawData: UserInfoWithMetadata): UserInfo {
    return {
        name: rawData.name,
        avatar: rawData.avatar,
        id: rawData.id,
    };
}
