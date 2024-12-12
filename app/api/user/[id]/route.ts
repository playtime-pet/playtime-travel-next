import { NextResponse } from "next/server";

import userInfoService from "@/app/services/userInfoService";
import { deleteUser, supabase } from "@/app/lib/supabase";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        const userInfo = await userInfoService.get(id);

        if (!userInfo) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(userInfo);
    } catch (error) {
        console.error("Error fetching user:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

// link user with supabse user ID
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const userInfo = await userInfoService.deleteUser(id);
    // delete user from supabase
    const data = await deleteUser(id);

    return NextResponse.json({ user_id: userInfo });
}
