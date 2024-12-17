import petInfoService from "@services/petInfoService";
import { NextResponse } from "next/server";
import { PetInfo } from "@/app/models/PetInfo";

export async function POST(req: Request) {
    const petData: Omit<PetInfo, "id"> = await req.json();
    const petInfo = await petInfoService.create(petData);
    return NextResponse.json(petInfo);
}

export async function GET() {
    const petInfo = await petInfoService.list();
    return NextResponse.json(petInfo);
}
