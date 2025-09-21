import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Question } from './../../types/questions'; // <-- Import our types

// Raw data interface for what we get from Supabase
interface RawQuestionData {
  q_id: number;
  provider_id: number;
  course_id: number;
  q_title: string;
  file_location: string;
  con_points: number;
  c_name: string;
  name: string;
  dept: string;
  batch: string;
  year: number,
  // These fields only exist in ct_questions_view
  t_name?: string;
  t_designation?: string;
  t_dept_name?: string;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only key
);

export async function POST() {
  try {
    console.log('Fetching practice questions from multiple views...');
    
    // Fetch all three datasets in parallel
    const [ctRes, termRes, othersRes] = await Promise.all([
      supabase.from("ct_questions_view").select("*"),
      supabase.from("term_questions_view").select("*"),
      supabase.from("others_questions_view").select("*"),
    ]);

    // Handle possible errors
    if (ctRes.error || termRes.error || othersRes.error) {
      console.error("Supabase fetch errors:", {
        ct: ctRes.error,
        term: termRes.error,
        others: othersRes.error,
      });

      return NextResponse.json(
        {
          error:
            ctRes.error?.message ||
            termRes.error?.message ||
            othersRes.error?.message,
        },
        { status: 500 }
      );
    }

    console.log('Raw data counts:', {
      ct: ctRes.data?.length || 0,
      term: termRes.data?.length || 0,
      others: othersRes.data?.length || 0,
    });

    // Type-safe normalization function
    const normalizeData = (
      data: RawQuestionData[],
      type: 'ct' | 'term' | 'others'
    ): Question[] =>
      data.map((item) => ({
        ...item,
        q_type: type,
        t_name: type === 'ct' ? item.t_name || null : null,
        t_designation: type === 'ct' ? item.t_designation || null : null,
        t_dept_name: type === 'ct' ? item.t_dept_name || null : null,
      }));

    const mergedData: Question[] = [
      ...normalizeData(ctRes.data || [], 'ct'),
      ...normalizeData(termRes.data || [], 'term'),
      ...normalizeData(othersRes.data || [], 'others'),
    ];

    console.log('Merged data count:', mergedData.length);

    // Sort data by course name character count (as requested in original requirements)
    const sortedData = mergedData.sort((a, b) => {
      const aLength = (a.c_name || '').length;
      const bLength = (b.c_name || '').length;
      return aLength - bLength;
    });

    console.log('Successfully processed and sorted practice questions');
    return NextResponse.json(sortedData, { status: 200 });
  } catch (err) {
    console.error('Unexpected server error:', err);
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
