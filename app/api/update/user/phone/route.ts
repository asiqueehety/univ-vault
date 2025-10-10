import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {

    const body = await req.json();
    const user_id = body.user_id;
    const updated_phone = body.updated_phone;

    console.log("User ID received:", user_id);
    console.log("Updated phone received:", updated_phone);

    const { data, error } = await supabase
      .from('users')
      .update({ phone: updated_phone })
      .eq('user_id', user_id);

    if (error) {
      console.error('Error fetching courses:', error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { status: 200 }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
