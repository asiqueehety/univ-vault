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


    if (!dbdata.provider_id || !dbdata.m_type || !dbdata.course_id || !dbdata.m_title || !dbdata.m_description || !dbdata.file_location || !dbdata.con_points || !dbdata.selectedTeacherId) {
      if(!dbdata.provider_id){return NextResponse.json({ error: "Missing provider id" }, { status: 400 });}
      if(!dbdata.m_type){return NextResponse.json({ error: "Missing material type" }, { status: 400 });}
      if(!dbdata.course_id){return NextResponse.json({ error: "Missing course id" }, { status: 400 });}
      if(!dbdata.m_title){return NextResponse.json({ error: "Missing title" }, { status: 400 });}
      if(!dbdata.m_description){return NextResponse.json({ error: "Missing description" }, { status: 400 });}
      if(!dbdata.file_location){return NextResponse.json({ error: "Missing file location" }, { status: 400 });}
      if(!dbdata.con_points){return NextResponse.json({ error: "Missing contribution id" }, { status: 400 });}
      if(!dbdata.selectedTeacherId){return NextResponse.json({ error: "Missing selected teacher id" }, { status: 400 });}
    }

    const material =
    {
      provider_id:dbdata.provider_id,
      m_type:dbdata.m_type,
      course_id:dbdata.course_id,
      m_title:dbdata.m_title,
      m_description: dbdata.m_description,
      file_location: dbdata.file_location,
      con_points:dbdata.con_points,
    }

//material gets inserted into materials table
    const { data, error } = await supabase
    .from("materials")
    .insert([material]);
    
    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

//after insertion, contribution points are updated in users table
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

//teacher_materials table is updated and also checked for duplicates

    const {data: m, error: e} = await supabase
    .from('materials')
    .select('m_id')
    .eq('provider_id', dbdata.provider_id)
    .eq('file_location', dbdata.file_location)
    .order('m_id', {ascending: false})
    .limit(1);

    if (e) {
      console.error("Fetch material id error:", e);
      return NextResponse.json({ error: e.message }, { status: 500 });
    }

    const { data: updatedUser3, error: error4 } = await supabase
    .from('teachers_materials')
    .upsert(
      [{ teacher_id: dbdata.selectedTeacherId, material_id:m[0]?.m_id }],
      { ignoreDuplicates: true }
    );

    if (error4) {
      console.error("Upsert teacher_materials error:", error4);
      return NextResponse.json({ error: error4.message }, { status: 500 });
    }

//teacher_courses table is updated and also checked for duplicates
    const { data: updatedUser4, error: error5 } = await supabase
    .from('teachers_courses')
    .upsert(
      [{ teacher_id: dbdata.selectedTeacherId, course_id: dbdata.course_id }],
      { ignoreDuplicates: true }
    );
    if (error5) {
      console.error("Upsert teacher_courses error:", error5);
      return NextResponse.json({ error: error5.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Inserted material successfully", data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
