import { NextResponse } from "next/server";

import placesService from "@/app/services/placesService";

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
