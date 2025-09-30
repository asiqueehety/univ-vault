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


    if (!dbdata.sch_date || !dbdata.sch_type || !dbdata.sch_course_id || !dbdata.sch_batch || !dbdata.sch_dept_name ) {
        if(!dbdata.sch_date){return NextResponse.json({ error: "Missing schedule date" }, { status: 400 });}
        if(!dbdata.sch_type){return NextResponse.json({ error: "Missing schedule type" }, { status: 400 });}
        if(!dbdata.sch_course_id){return NextResponse.json({ error: "Missing course id" }, { status: 400 });}
        if(!dbdata.sch_batch){return NextResponse.json({ error: "Missing schedule batch" }, { status: 400 });}
        if(!dbdata.sch_dept_name){return NextResponse.json({ error: "Missing schedule department name" }, { status: 400 });}
    }

    //i want to add a day in the date received
    const date = new Date(dbdata.sch_date);
    date.setDate(date.getDate() + 1);
    dbdata.sch_date = date;

    const schedule = 
    {
        sch_date: dbdata.sch_date,
        sch_type: dbdata.sch_type,
        sch_course_id: dbdata.sch_course_id,
        sch_batch: dbdata.sch_batch,
        sch_materials_id_1: dbdata.sch_material_1,
        sch_materials_id_2: dbdata.sch_material_2,
        sch_materials_id_3: dbdata.sch_material_3,
        sch_materials_id_4: dbdata.sch_material_4,
        sch_materials_id_5: dbdata.sch_material_5,
        sch_dept_name: dbdata.sch_dept_name,
        sch_shortnote: dbdata.sch_shortnote
    }

    const { data, error } = await supabase
    .from("scheduled")
    .insert([schedule]);
    
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
