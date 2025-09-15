import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const {dbdata} = await req.json();

    console.log(dbdata);


    if (!dbdata.provider_id || !dbdata.m_type || !dbdata.course_id || !dbdata.m_title || !dbdata.m_description || !dbdata.file_location || !dbdata.con_points) {
      if(!dbdata.provider_id){return NextResponse.json({ error: "Missing provider id" }, { status: 400 });}
      if(!dbdata.m_type){return NextResponse.json({ error: "Missing material type" }, { status: 400 });}
      if(!dbdata.course_id){return NextResponse.json({ error: "Missing course id" }, { status: 400 });}
      if(!dbdata.m_title){return NextResponse.json({ error: "Missing title" }, { status: 400 });}
      if(!dbdata.m_description){return NextResponse.json({ error: "Missing description" }, { status: 400 });}
      if(!dbdata.file_location){return NextResponse.json({ error: "Missing file location" }, { status: 400 });}
      if(!dbdata.con_points){return NextResponse.json({ error: "Missing contribution id" }, { status: 400 });}
    }

    const { data, error } = await supabase
      .from("materials")
      .insert([
        dbdata,
      ]);
    
      if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('contribution_points')
      .eq('user_id', dbdata.provider_id)
      .single();
    if (userError) {
      console.error("Fetch user error:", userError);
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const newPoints = (user.contribution_points || 0) + dbdata.con_points;
    const { data: updatedUser, error: error2 } = await supabase
      .from('users')
      .update({ contribution_points: newPoints })
      .eq('user_id', dbdata.provider_id);

    if (error2) {
      console.error("Update points error:", error2);
      return NextResponse.json({ error: error2.message }, { status: 500 });
    }

      //user_courses table is updated and also checked for duplicates
    const { data: updatedUser2, error: error3 } = await supabase
      .from('user_courses')
      .upsert(
        [{ user_id: dbdata.provider_id, c_id: dbdata.course_id }],
        { ignoreDuplicates: true }
      );

    
    if (error3) {
      console.error("Upsert user_courses error:", error3);
      return NextResponse.json({ error: error3.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Inserted material successfully", data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
