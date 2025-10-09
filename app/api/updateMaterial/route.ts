import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { m_id, m_title, m_description, userId } = await request.json();

    if (!m_id || !userId) {
      return NextResponse.json({ error: 'Material ID and User ID are required' }, { status: 400 });
    }

    console.log('Updating material:', m_id);

    // First verify the material belongs to this user
    const { data: existingMaterial, error: checkError } = await supabase
      .from('materials')
      .select('provider_id')
      .eq('m_id', m_id)
      .single();

    if (checkError || !existingMaterial) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }

    if (existingMaterial.provider_id !== userId) {
      return NextResponse.json({ error: 'Unauthorized to edit this material' }, { status: 403 });
    }

    // Update the material
    const { data, error } = await supabase
      .from('materials')
      .update({
        m_title,
        m_description
      })
      .eq('m_id', m_id)
      .select();

    if (error) {
      console.error('Error updating material:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Material updated successfully');
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
