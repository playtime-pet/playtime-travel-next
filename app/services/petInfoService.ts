import { petCache } from "@/app/utils/cache";
import { DbService } from "./dbService";
import { QueryData } from "@supabase/supabase-js";
import { TablesInsert } from "../utils/types/database-generated.types";
import { PetInfo } from "../models/PetInfo";

const dbService = new DbService();

async function list() {
    const res = await dbService.list<"pet_info">("pet_info");
    return res;
}

async function create(pet: PetInfo) {
    const res = await dbService.create<"pet_info">("pet_info", pet);
    petCache.set(pet.id, pet);

    return res;
}

async function get(id: string) {
    if (petCache.has(id)) {
        return petCache.get(id) as PetInfo;
    }

    const pet = await dbService.get<"pet_info">("pet_info", "id", id);

    petCache.set(id, pet as PetInfo);

    return pet;
}

async function deletePet(id: string) {
    await dbService.delete<"pet_info">("pet_info", "id", id);
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
