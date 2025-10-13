import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ valid: false, error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ valid: false, error: "Invalid token format" }, { status: 401 });
    }

    // Verify JWT on server-side
    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    return NextResponse.json({ valid: true, payload });
  } catch (err) {
    console.error("JWT verification error:", err);
    return NextResponse.json({ valid: false, error: "Invalid token" }, { status: 401 });
  }
}
