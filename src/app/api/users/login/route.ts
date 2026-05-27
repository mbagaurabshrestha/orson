import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        // Check against hardcoded admin credentials from .env
        if (
            username !== process.env.ADMIN_USERNAME ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Create token
        const token = jwt.sign(
            { username, role: "admin" },
            process.env.TOKEN_SECRET!,
            { expiresIn: "1d" }
        );

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        // Set token in cookie
        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Error" },
            { status: 500 }
        );
    }
}