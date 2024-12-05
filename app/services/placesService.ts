import { DbService } from "./dbService";
import { PlaceInput, Places } from "../models/Places";
import { createLocationPoint } from "../utils/tools";
import { Database } from "../utils/types/database.types";

const dbService = new DbService();

async function insertPlace(place: PlaceInput) {
    const locationPoint = createLocationPoint(place.longitude, place.latitude);
    const { longitude: _lng, latitude: _lat, ...originPlace } = place;
    const placeData: Database["public"]["Tables"]["places"]["Insert"] = {
        ...originPlace,
        location: locationPoint,
    };
    const res = await dbService.create<"places">("places", placeData);
    return res;
}

async function listPlaces(): Promise<Places[]> {
    const res: Database["public"]["Tables"]["places"]["Row"][] =
        await dbService.list<"places">("places");
    return res;
}

async function getPlace(id: string): Promise<Places> {
    const res = await dbService.get<"places">("places", "id", id);
    return res;
}

async function updatePlace(id: string, place: Partial<Omit<Places, "id">>) {
    const updateData: Database["public"]["Tables"]["places"]["Update"] = place;
    const res = await dbService.update<"places">(
        "places",
        updateData,
        "id",
        id
    );
    return res;
}

const placesService = {
    insertPlace,
    listPlaces,
    getPlace,
    updatePlace,
};

export default placesService;
