import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { pathname } = await request.json();

    if (!pathname) {
      return NextResponse.json({ error: 'Missing pathname' }, { status: 400 });
    }

    // Try to find an existing record for the pathname
    const { data: existing, error: selectError } = await supabase
      .from('page_views')
      .select('*')
      .eq('page_path', pathname)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      // PGRST116 is 'No rows found'
      return NextResponse.json({ error: selectError.message }, { status: 500 });
    }

    if (existing) {
      // Increment the count
      const { data, error: updateError } = await supabase
        .from('page_views')
        .update({ view_count: existing.view_count + 1 })
        .eq('id', existing.id)
        .select();

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }
      return NextResponse.json(data[0]);
    } else {
      // Create a new record
      const { data, error: insertError } = await supabase
        .from('page_views')
        .insert([{ page_path: pathname, view_count: 1 }])
        .select();

      if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }
      return NextResponse.json(data[0]);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('page_views')
      .select('*')
      .order('view_count', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
