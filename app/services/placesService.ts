import { DbService } from "./dbService";
import { initFromAMap, PlaceInput, Places } from "../models/Places";
import { createLocationPoint } from "../utils/tools";
import { Database } from "../utils/types/database.types";
import aMapService from "./aMapService";

const dbService = new DbService();
const db = dbService.getDatabase();

async function insertPlace(place: PlaceInput) {
    const locationPoint = createLocationPoint(place.longitude, place.latitude);
    const { longitude: _lng, latitude: _lat, ...originPlace } = place;
    const placeData: Database["public"]["Tables"]["places"]["Insert"] = {
        ...originPlace,
        location: locationPoint,
    };
    const { data, error } = await db
        .from("places")
        .insert(placeData)
        .select()
        .single();
    if (error) throw error;
    return data;
}

async function listPlaces(): Promise<Places[]> {
    const { data, error } = await db.from("places").select("*");
    if (error) throw error;
    return data;
}

async function getPlace(id: string): Promise<Places> {
    const { data, error } = await db
        .from("places")
        .select("*")
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
}

async function updatePlace(id: string, place: Partial<Omit<Places, "id">>) {
    const updateData: Database["public"]["Tables"]["places"]["Update"] = place;
    const { data, error } = await db
        .from("places")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();
    if (error) throw error;
    return data;
}

async function searchAndInsertPlace(name: string, city: string, type: string) {
    const placeInfo = await aMapService.getPlaceInfoByName(name, city);
    return insertPlace(initFromAMap(placeInfo, type));
}

async function nearbyPlaces(lat: number, long: number, type: string) {
    return dbService.nearbyPlacesWithinRadius(lat, long, type, 3);
}

async function nearbyPlacesWithinRadius(
    lat: number,
    long: number,
    radius_km: number
) {
    const { data, error } = await db.rpc("places_within_radius", {
        lat: lat,
        long: long,
        radius_km: radius_km,
    });
    if (error) throw error;
    return data;
}

const placesService = {
    insertPlace,
    listPlaces,
    getPlace,
    updatePlace,
    searchAndInsertPlace,
    nearbyPlaces,
    nearbyPlacesWithinRadius,
};

export default placesService;
