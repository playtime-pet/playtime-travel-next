import { petCache } from "@/app/utils/cache";
import { DbService } from "./dbService";
import { PetInfo } from "../models/PetInfo";

const dbService = new DbService();
const db = dbService.getDatabase();

async function list() {
    const { data, error } = await db.from("pet_info").select("*");
    if (error) throw error;
    return data;
}

async function create(pet: Omit<PetInfo, "id">) {
    const { data, error } = await db
        .from("pet_info")
        .insert(pet)
        .select()
        .single();
    if (error) throw error;
    petCache.set(data.id, data as PetInfo);

    return data;
}

async function get(id: string) {
    if (petCache.has(id)) {
        return petCache.get(id) as PetInfo;
    }

    const { data, error } = await db
        .from("pet_info")
        .select("*")
        .eq("id", id)
        .single();
    if (error) throw error;

    const pet = data as PetInfo;

    petCache.set(id, pet);

    return pet;
}

async function deletePet(id: string) {
    const { error } = await db.from("pet_info").delete().eq("id", id).select();
    if (error) throw error;

    petCache.delete(id);

    return id;
}

const petInfoService = {
    list,
    create,
    get,
    deletePet,
};

export default petInfoService;
