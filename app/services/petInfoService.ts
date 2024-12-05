import { petCache } from "@/app/utils/cache";
import { DbService } from "./dbService";
import { PetInfo } from "../models/PetInfo";
import { Database } from "../utils/types/database.types";

const dbService = new DbService();

async function list() {
    const res: Database["public"]["Tables"]["pet_info"]["Row"][] =
        await dbService.list<"pet_info">("pet_info");
    return res;
}

async function create(pet: Omit<PetInfo, "id">) {
    const res = await dbService.create<"pet_info">("pet_info", pet);
    petCache.set(res.id, res as PetInfo);

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
