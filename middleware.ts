import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requestContext } from "./app/context/RequestContext";
// import { userCache } from "./app/utils/cache";

export async function middleware(request: NextRequest) {
    const userId =
        request.headers.get("x-user-id") ||
        request.nextUrl.searchParams.get("userId");
    const petId =
        request.headers.get("x-pet-id") ||
        request.nextUrl.searchParams.get("petId");

    return requestContext.runWithContext(userId, petId, async () => {
        // 中间件的其他逻辑...
        return NextResponse.next();
    });
}

export const config = {
    matcher: "/api/langgraph/:path*",
};
