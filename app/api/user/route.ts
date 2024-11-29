import userInfoService from "@/services/userInfoService";
import { NextResponse } from "next/server";
import { generateUUID } from "@/app/utils/tools";

export async function POST(req: Request) {
    const { name, avatar } = await req.json();
    const userInfo = await userInfoService.create({
        id: generateUUID(),
        name,
        avatar,
    });
    return NextResponse.json(userInfo);
}

export async function GET(req: Request) {
    const { id } = await req.json();
    const userInfo = await userInfoService.get(id as string);
    return NextResponse.json(userInfo);
}
