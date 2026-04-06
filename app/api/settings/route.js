import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Server-side admin client to bypass RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Settings fetch error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || {});
  } catch (error) {
    console.error('Settings GET catch error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { site_title, site_description, keywords, local_focus } = body;

    const { data, error } = await supabaseAdmin
      .from('settings')
      .upsert({
        id: 1,
        site_title,
        site_description,
        keywords,
        local_focus,
        updated_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      console.error('Settings update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data?.[0] || {}, { status: 201 });
  } catch (error) {
    console.error('Settings POST catch error:', error);
    return NextResponse.json({ error: 'Internal Server Error: ' + error.message }, { status: 500 });
  }
}

