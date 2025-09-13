import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ 
      message: "Logged out successfully" 
    });

    // Clear the httpOnly token cookie by setting it to expire immediately
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0, // Expire immediately
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
