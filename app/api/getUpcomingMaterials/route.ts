
//still need to change it

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {

    const body = await req.json();
    if (!body.sch_dept || !body.sch_batch) {
      return NextResponse.json(
        { error: 'sch_dept and sch_batch are required' },
        { status: 400 }
      );
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = body.date || today.toISOString().split("T")[0];
    const dept = body.sch_dept;
    const batch = body.sch_batch;

    const { data, error } = await supabase
    .from('v_scheduled')
    .select('*')
    .gte('sch_date', date)
    .eq('sch_dept_name', dept)
    .eq('sch_batch', batch)
    .order('sch_date',{ascending: true })
    ;

    if (error) {
      console.error('Error fetching scheduled:', error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    for(let i=0;i<data.length;i++)
    {
        const sch = data[i];
        if(sch.sch_materials==null)
        {
            sch.sch_materials=[];
            continue;
        }
    }
    return NextResponse.json(
      { scheduled: data },
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
