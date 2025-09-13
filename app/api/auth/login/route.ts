import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'; // Keep this safe in .env

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, pw } = body;

    // Validate input
    if (!email || !pw) {
      return NextResponse.json(
        { error: !email ? 'Missing email' : 'Missing password' },
        { status: 400 }
      );
    }

    // Fetch user by email
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single(); // Expecting unique email

    if (error || !user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Validate password using bcrypt
    const isPasswordValid = await bcrypt.compare(pw, user.pw);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Create JWT payload
    const tokenPayload = {
      user_id: user.user_id,
      email: user.email,
      role: user.role,
    };

    // Generate JWT
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '7d' }); // token valid for 7 days

    // Remove password before sending back
    const { pw: _, ...userWithoutPassword } = user;

    // Return success response with JWT
    const response = NextResponse.json({
        message: 'Login successful',
        token,
        user: userWithoutPassword,
    });
    response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    
    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
