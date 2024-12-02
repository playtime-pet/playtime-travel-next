import petInfoService from "@services/petInfoService";
import { NextResponse } from "next/server";
import { generateUUID } from "@/app/utils/tools";

export async function POST(req: Request) {
    const { user_id, name, age, size, type, gender, description } =
        await req.json();
    const petInfo = await petInfoService.create({
        id: generateUUID(),
        user_id: user_id,
        name,
        age,
        size,
        type,
        gender,
        description,
    });
    return NextResponse.json(petInfo);
}

export async function GET() {
    const petInfo = await petInfoService.list();
    return NextResponse.json(petInfo);
}
