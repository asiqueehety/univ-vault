import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";


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
    if (!dbdata.name || !dbdata.email || !dbdata.pw || !dbdata.phone || !dbdata.institution || !dbdata.batch || !dbdata.dept) {
      if(!dbdata.name){return NextResponse.json({ error: "Missing name" }, { status: 400 });}
      if(!dbdata.email){return NextResponse.json({ error: "Missing email" }, { status: 400 });}
      if(!dbdata.pw){return NextResponse.json({ error: "Missing password" }, { status: 400 });}
      if(!dbdata.phone){return NextResponse.json({ error: "Missing phone" }, { status: 400 });}
      if(!dbdata.institution){return NextResponse.json({ error: "Missing institution" }, { status: 400 });}
      if(!dbdata.batch){return NextResponse.json({ error: "Missing batch" }, { status: 400 });}
      if(!dbdata.dept){return NextResponse.json({ error: "Missing dept" }, { status: 400 });}
    }
    const hpw = await bcrypt.hash(dbdata.pw, 10);
    dbdata.pw=hpw;


    // Insert into database
    const { data, error } = await supabase
      .from("users")
      .insert([
        dbdata,
      ]);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "User created successfully", data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
