import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';



export async function GET() {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn("Supabase jobs fetch failed:", error.message);
      return NextResponse.json([]);
    }

    if (!data || data.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Jobs GET catch triggered:", err);
    return NextResponse.json([]);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, department, type, experience, path, description, responsibilities, requirements, questions } = body;

    if (!title || !department || !type || !experience || !path || !description) {
      return NextResponse.json({ error: 'Missing mandatory job parameters.' }, { status: 400 });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('jobs')
      .insert([
        {
          title,
          department,
          type,
          experience,
          path,
          description,
          responsibilities: Array.isArray(responsibilities) ? responsibilities : [],
          requirements: Array.isArray(requirements) ? requirements : [],
          questions: Array.isArray(questions) ? questions : []
        }
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("POST Job Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing vacancy identifier ID.' }, { status: 400 });
    }

    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Vacancy removed successfully.' });
  } catch (err) {
    console.error("DELETE Job Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
