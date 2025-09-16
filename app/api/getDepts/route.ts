import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST() {
  try {
    const { data, error } = await supabase
  .from('teachers')
  .select('t_dept_name')
  .order('t_dept_name', { ascending: true });

    if (error) throw error;

    // Remove duplicates in JS
    const uniqueDepartments = [...new Set(data.map(item => item.t_dept_name))];

    if (error) {
      console.error('Error fetching courses:', error);
      return NextResponse.json(
        { error: error},
        { status: 500 }
      );
    }

    return NextResponse.json(
      { depts: uniqueDepartments },
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
