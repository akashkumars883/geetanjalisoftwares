import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const { data, error } = await supabaseAdmin
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, slug, excerpt, content, image_url, category, author, is_published, tags } = body;

    const { data, error } = await supabaseAdmin
      .from('blogs')
      .update({ 
        title, 
        slug, 
        excerpt, 
        content, 
        image_url, 
        category, 
        author, 
        tags: tags || [],
        is_published: is_published ?? true // Default to true if not specified
      })
      .eq('id', id)
      .select();

    if (error) {
       console.error('Supabase update error:', error);
       return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      console.error('Supabase update returned no data for ID:', id);
      return NextResponse.json({ error: 'Failed to update blog entry' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Blog updated successfully', data: data[0] });
  } catch (error) {
    console.error('API error in PUT /api/blogs/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error: ' + error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const { error } = await supabaseAdmin
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
