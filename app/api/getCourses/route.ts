import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {

    const body = await req.json();
    const dept = body.department;

    if(dept=="")
    {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('c_name',{ascending: true });

    if (error) {
      console.error('Error fetching courses:', error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { courses: data },
      { status: 200 }
    );
    }
    else{
    console.log("Department received:", dept);
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('c_dept', dept)
      .order('c_name',{ascending: true });

    if (error) {
      console.error('Error fetching courses:', error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { courses: data },
      { status: 200 }
    );
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
