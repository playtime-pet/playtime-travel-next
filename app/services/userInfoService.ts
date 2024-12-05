import { UserInfo } from "@models/UserInfo";
import { userCache } from "@/app/utils/cache";

import { DbService } from "./dbService";
import { Database } from "../utils/types/database.types";

const dbService = new DbService();

async function list() {
    const res: Database["public"]["Tables"]["user_info"]["Row"][] =
        await dbService.list<"user_info">("user_info");
    return res;
}

async function create(data: Omit<UserInfo, "id">) {
    const res = await dbService.create<"user_info">("user_info", data);
    userCache.set(res.id, res as UserInfo);

    return res;
}

async function get(id: string) {
    if (userCache.has(id)) {
        return userCache.get(id) as UserInfo;
    }

    const user = await dbService.get<"user_info">("user_info", "id", id);

    userCache.set(id, user as UserInfo);

    return user;
}

async function deleteUser(id: string) {
    await dbService.delete<"user_info">("user_info", "id", id);
    userCache.delete(id);

    return id;
}

const userInfoService = { list, create, get, deleteUser };
export default userInfoService;
