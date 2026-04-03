import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendLeadAutoReply, sendAdminNotification } from '@/lib/email-service';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, service, message } = body;

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data: insertedData, error } = await supabase
      .from('leads')
      .insert([{ name, email, service, message, status: 'new' }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Trigger auto-reply and admin notification (don't block the main response)
    const newLead = { name, email, service, message };
    (async () => {
       await sendLeadAutoReply(newLead);
       await sendAdminNotification(newLead);
    })();

    return NextResponse.json({ message: 'Lead saved successfully', data: insertedData }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
