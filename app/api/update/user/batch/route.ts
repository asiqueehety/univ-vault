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
    const updated_batch = body.updated_batch;

    console.log("User ID received:", user_id);
    console.log("Updated batch received:", updated_batch);

    const { data, error } = await supabase
      .from('users')
      .update({ batch: updated_batch })
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
