import placesService from "@services/placesService";
import { NextResponse } from "next/server";
import { PlaceInput } from "@/app/models/Places";

export async function POST(req: Request) {
    const placeData: PlaceInput = await req.json();
    const place = await placesService.insertPlace(placeData);
    return NextResponse.json(place);
}

export async function GET() {
    const places = await placesService.listPlaces();
    return NextResponse.json(places);
}
