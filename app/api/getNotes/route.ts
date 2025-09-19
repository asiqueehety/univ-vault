import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only key
);

export async function POST() {
  try {
    const { data, error } = await supabase
      .from("notes_view")
      .select("*");

    if (error) {
      console.error('Supabase error fetching notes:', error.message);
      console.error('Error details:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }


    if (!data || !Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return NextResponse.json({ error: 'Invalid data format from database' }, { status: 500 });
    }

    const sortedData = data.sort((a, b) => {
      const aLength = (a.c_name || '').length;
      const bLength = (b.c_name || '').length;
      return aLength - bLength;
    });


    return NextResponse.json(sortedData, { status: 200 });
  } catch (err) {
    console.error('Unexpected server error:', err);
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
