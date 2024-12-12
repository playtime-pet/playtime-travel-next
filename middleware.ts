import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requestContext } from "./app/context/RequestContext";
import { userContext } from "./app/context/UserContext";
import { UserInfo } from "./app/models/UserInfo";
import userInfoService from "./app/services/userInfoService";
import petInfoService from "./app/services/petInfoService";
import { PetInfo } from "./app/models/PetInfo";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// import { userCache } from "./app/utils/cache";

export async function middleware(request: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req: request, res });

    // 刷新 session 如果需要的话
    await supabase.auth.getSession();

    return res;
    // const userId =
    //     request.headers.get("x-user-id") ||
    //     request.nextUrl.searchParams.get("userId");
    // if (!userId) {
    //     return NextResponse.next();
    // }
    // const userInfo: UserInfo = await userInfoService.get(userId);
    // const petId =
    //     request.headers.get("x-pet-id") ||
    //     request.nextUrl.searchParams.get("petId");

    // let petInfo: PetInfo | null = null;

    // return requestContext.runWithContext(userId, petId, async () => {
    //     console.log("userID", userId, "petID", petId);

    //     userContext.setUserInfo(userInfo);
    //     if (petId) {
    //         petInfo = await petInfoService.get(petId);
    //         userContext.setPetInfo(petId, petInfo);
    //     }
    //     // 中间件的其他逻辑...
    //     return NextResponse.next();
    // });
}

export const config = {
    matcher: "/api/langgraph/:path*",
};
