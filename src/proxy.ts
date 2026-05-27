import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {

    const path = request.nextUrl.pathname;

    // Public routes
    const isPublicPath =
        path === "/" ||
        path === "/login";

    // Get token from cookies
    const token = request.cookies.get("token")?.value || "";

    // If user is NOT logged in and tries to access protected route
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // If user IS logged in and tries to access public route
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    // Allow request to continue
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/profile/:path*",
    ],
};