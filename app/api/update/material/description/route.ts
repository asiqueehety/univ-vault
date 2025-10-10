import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {

    const body = await req.json();
    const material_id = body.material_id;
    const updated_description = body.updated_description;

    console.log("Material ID received:", material_id);
    console.log("Updated description received:", updated_description);

    const { data, error } = await supabase
      .from('materials')
      .update({ m_description: updated_description })
      .eq('m_id', material_id);

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
