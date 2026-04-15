import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Admin-privileged client for server-side actions
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('blogs')
      .select('id, title, slug, image_url, created_at, category, excerpt, author, is_published')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, image_url, category, author, tags } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('blogs')
      .insert([{ 
        title, 
        slug, 
        excerpt, 
        content, 
        image_url, 
        category, 
        author,
        tags: tags || [],
        is_published: true // Mark as published by default for now
      }])
      .select();

    if (error) {
      console.error('Supabase admin insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      console.error('Supabase insert returned no data');
      return NextResponse.json({ error: 'Failed to create blog entry' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Blog created successfully', data: data[0] }, { status: 201 });
  } catch (error) {
    console.error('API error in POST /api/blogs:', error);
    return NextResponse.json({ error: 'Internal Server Error: ' + error.message }, { status: 500 });
  }
}
