import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('batch',)
      .order('batch',{ascending: true }); // Equivalent to SELECT c_name FROM courses

    if (error) {
      console.error('Error fetching batches:', error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
        { batches: data },
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
