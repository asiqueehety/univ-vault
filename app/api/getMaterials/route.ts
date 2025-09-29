import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {

    const body = await req.json();
    const course_id = body.course_id;
    console.log("Course_id received:", course_id);
    const { data, error } = await supabase
      .from('materials')
      .select('m_id, m_title, m_type')
      .eq('course_id', course_id)
      .order('m_title',{ascending: true });

    if (error) {
      console.error('Error fetching materials:', error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { materials: data },
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
