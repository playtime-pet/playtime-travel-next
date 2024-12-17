import { NextResponse } from "next/server";
import petInfoService from "@/app/services/petInfoService";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const pets = await petInfoService.getPetsByUserId(id);
    return NextResponse.json(pets);
}
