import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service role key is required for inserts
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const dbdata = body;

    console.log(dbdata);
    // Validate
    if (!dbdata.provider_id || !dbdata.m_type || !dbdata.course_id || !dbdata.m_title || !dbdata.m_description || !dbdata.file_location || !dbdata.con_id) {
      if(!dbdata.provider_id){return NextResponse.json({ error: "Missing provider id" }, { status: 400 });}
      if(!dbdata.m_type){return NextResponse.json({ error: "Missing material type" }, { status: 400 });}
      if(!dbdata.course_id){return NextResponse.json({ error: "Missing course id" }, { status: 400 });}
      if(!dbdata.m_title){return NextResponse.json({ error: "Missing title" }, { status: 400 });}
      if(!dbdata.m_description){return NextResponse.json({ error: "Missing description" }, { status: 400 });}
      if(!dbdata.file_location){return NextResponse.json({ error: "Missing file location" }, { status: 400 });}
      if(!dbdata.con_id){return NextResponse.json({ error: "Missing contribution id" }, { status: 400 });}
    }
    // Insert into database
    const { data, error } = await supabase
      .from("materials")
      .insert([
        dbdata,
      ]);

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
