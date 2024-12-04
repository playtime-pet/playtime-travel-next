import userInfoService from "@/app/services/userInfoService";
import { NextResponse } from "next/server";
import { UserInfo } from "@/app/models/UserInfo";

export async function POST(req: Request) {
    const userData: Omit<UserInfo, "id"> = await req.json();
    const userInfo = await userInfoService.create(userData);
    return NextResponse.json(userInfo);
}

export async function GET() {
    const userInfo = await userInfoService.list();
    return NextResponse.json(userInfo);
}
