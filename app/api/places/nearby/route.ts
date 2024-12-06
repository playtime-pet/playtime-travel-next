import { NextResponse } from "next/server";

import { DbService } from "@/app/services/dbService";

export async function POST(request: Request) {
    const dbService = new DbService();
    const { lat, long, place_type, radius_km = 3 } = await request.json();

    const restaurants = await dbService.nearbyPlacesWithinRadius(
        lat,
        long,
        place_type,
        radius_km
    );
    return NextResponse.json(restaurants);
}
