import { NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define your JWT payload type
interface MyJwtPayload extends JwtPayload {
  user_id: string; // or number, depending on your DB
}

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1]; // Extract Bearer token

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as MyJwtPayload;

    return NextResponse.json({ user_id: decoded.user_id });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
