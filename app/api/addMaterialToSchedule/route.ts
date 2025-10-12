import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const dbdata = await req.json();

    console.log(dbdata);


    if (!dbdata.sch_id || !dbdata.m_id || !dbdata.mcount ) {
        if(!dbdata.sch_id){return NextResponse.json({ error: "Missing schedule ID" }, { status: 400 });}
        if(!dbdata.m_id){return NextResponse.json({ error: "Missing material ID" }, { status: 400 });}
        if(!dbdata.mcount){return NextResponse.json({ error: "Missing count" }, { status: 400 });}
    }

    const { data, error } = await supabase
    .from('scheduled')
    .update({[`sch_materials_id_${dbdata.mcount + 1}`]: dbdata.m_id})
    .eq('sch_id', dbdata.sch_id);
    
    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Inserted material successfully", data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
