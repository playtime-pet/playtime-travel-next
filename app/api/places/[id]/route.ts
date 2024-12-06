import { NextResponse } from "next/server";

import placesService from "@/app/services/placesService";
import { DbService } from "@/app/services/dbService";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const place = await placesService.getPlace(id);

    if (!place) {
        return NextResponse.json({ error: "Place not found" }, { status: 404 });
    }

    return NextResponse.json(place);
}

export async function POST(request: Request) {
    const dbService = new DbService();
    const { lat, long } = await request.json();
    const restaurants = await dbService.nearbyRestaurants(lat, long);
    return NextResponse.json(restaurants);
}
