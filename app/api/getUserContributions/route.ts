import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    console.log('Fetching contributions for user:', userId);

    // Fetch materials with course information
    const { data, error } = await supabase
      .from('materials')
      .select(`
        m_id,
        m_type,
        m_title,
        m_description,
        file_location,
        con_points,
        course_id,
        courses (
          c_name
        )
      `)
      .eq('provider_id', userId)
      .order('m_id', { ascending: false });

    if (error) {
      console.error('Error fetching contributions:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform the data to flatten the course name
    const contributions = data?.map(item => {
      const courses = item.courses as unknown;
      const courseData = courses as { c_name: string } | null;
      return {
        m_id: item.m_id,
        m_type: item.m_type,
        m_title: item.m_title,
        m_description: item.m_description,
        file_location: item.file_location,
        con_points: item.con_points,
        course_id: item.course_id,
        c_name: courseData?.c_name || 'Unknown Course'
      };
    }) || [];

    console.log('Found contributions:', contributions.length);
    return NextResponse.json(contributions, { status: 200 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
