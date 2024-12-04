import { DbService } from "./dbService";
import { PlaceInput, Places } from "../models/Places";
import { createLocationPoint } from "../utils/tools";

const dbService = new DbService();

async function insertPlace(place: PlaceInput) {
    const locationPoint = createLocationPoint(place.longitude, place.latitude);
    const { longitude, latitude, ...originPlace } = place;
    const placeData = { ...originPlace, location: locationPoint };
    const res = await dbService.create<"places">("places", placeData);

    return res;
}

async function listPlaces() {
    const res = await dbService.list<"places">("places");

    return res;
}

async function getPlace(id: string) {
    const res = await dbService.get<"places">("places", "id", id);

    return res;
}

async function updatePlace(id: string, place: Omit<Places, "id">) {
    const res = await dbService.update<"places">("places", place, "id", id);

    return res;
}

const placesService = {
    insertPlace,
    listPlaces,
    getPlace,
    updatePlace,
};

export default placesService;
