import { UserInfo } from "@models/UserInfo";
import { PetInfo } from "@models/PetInfo";

class UserContextManager {
    private static instance: UserContextManager;
    private userInfo: UserInfo | null = null;
    private petInfo: Map<string, PetInfo> = new Map();

    private constructor() {}

    public static getInstance(): UserContextManager {
        if (!UserContextManager.instance) {
            UserContextManager.instance = new UserContextManager();
        }
        return UserContextManager.instance;
    }

    public setUserInfo(info: UserInfo) {
        this.userInfo = info;
    }

    public getUserInfo(): UserInfo | null {
        return this.userInfo;
    }

    public setPetInfo(userId: string, pets: PetInfo) {
        this.petInfo.set(userId, pets);
    }

    public getPetInfo(userId: string): PetInfo | null {
        return this.petInfo.get(userId) || null;
    }

    public clear() {
        this.userInfo = null;
        this.petInfo.clear();
    }
}

export const userContext = UserContextManager.getInstance();
