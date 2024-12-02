import { NextResponse } from "next/server";

import petInfoService from "@/app/services/petInfoService";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const userInfo = await petInfoService.get(id);

    if (!userInfo) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userInfo);
}
