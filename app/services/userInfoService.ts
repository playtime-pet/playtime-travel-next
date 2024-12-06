import { UserInfo } from "@models/UserInfo";
import { userCache } from "@/app/utils/cache";

import { DbService } from "./dbService";

const dbService = new DbService();
const db = dbService.getDatabase();

async function list() {
    const { data, error } = await db.from("user_info").select("*");
    if (error) throw error;
    return data;
}

async function create(user: Omit<UserInfo, "id">) {
    const { data, error } = await db
        .from("user_info")
        .insert(user)
        .select()
        .single();
    if (error) throw error;
    userCache.set(data.id, data as UserInfo);

    return data;
}

async function get(id: string) {
    if (userCache.has(id)) {
        return userCache.get(id) as UserInfo;
    }

    const { data, error } = await db
        .from("user_info")
        .select("*")
        .eq("id", id)
        .single();
    if (error) throw error;

    userCache.set(id, data as UserInfo);

    return data;
}

async function deleteUser(id: string) {
    const { error } = await db.from("user_info").delete().eq("id", id);
    if (error) throw error;

    userCache.delete(id);

    return id;
}

const userInfoService = { list, create, get, deleteUser };
export default userInfoService;
