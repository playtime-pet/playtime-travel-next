import { NextResponse } from "next/server";

import userInfoService from "@/app/services/userInfoService";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const userInfo = await userInfoService.get(id);

    if (!userInfo) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userInfo);
}
