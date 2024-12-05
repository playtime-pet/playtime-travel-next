import { Database } from "../utils/types/database.types";

export type Places = Database["public"]["Tables"]["places"]["Row"];
export type PlaceInput = {
    name: string;
    description?: string;
    longitude: number;
    latitude: number;
    // Add any other required fields
};
