import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendCandidateAutoReply, sendAdminCandidateNotification } from '@/lib/email-service';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn("Could not fetch candidates from database (maybe the 'candidates' table is not created yet):", error.message);
      // Return empty array if the table doesn't exist yet to prevent admin panel breakage
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (err) {
    console.error("GET Candidates Error:", err);
    return NextResponse.json([]);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, role, experience, portfolio, resume_url, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !role || !experience || !resume_url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Try inserting into Supabase 'candidates' table.
    let dbSuccess = false;
    let dbErrorMsg = null;
    try {
      const { data, error } = await supabase
        .from('candidates')
        .insert([{
          name,
          email,
          phone,
          role,
          experience,
          portfolio: portfolio || null,
          resume_url,
          message: message || null,
          status: 'new'
        }])
        .select();

      if (error) {
        dbErrorMsg = error.message;
        console.error('Supabase Candidates table insert failed:', error);
      } else {
        dbSuccess = true;
      }
    } catch (dbErr) {
      dbErrorMsg = dbErr.message;
      console.error('Database connection or schema exception in Candidates:', dbErr);
    }

    // Trigger emails (don't block the API response)
    const candidateData = { name, email, phone, role, experience, portfolio, resume_url, message };
    (async () => {
      try {
        await sendCandidateAutoReply(candidateData);
        await sendAdminCandidateNotification(candidateData);
      } catch (err) {
        console.error("Auto reply email service dispatch failed:", err);
      }
    })();

    // Return successful response
    return NextResponse.json({
      message: 'Application submitted successfully',
      database_saved: dbSuccess,
      database_error: dbErrorMsg
    }, { status: 201 });

  } catch (error) {
    console.error('API careers error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing candidate ID or target status parameter.' }, { status: 400 });
    }

    const { error } = await supabase
      .from('candidates')
      .update({ status })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Candidate status updated successfully.' });
  } catch (err) {
    console.error("PUT Candidate Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing candidate application identifier.' }, { status: 400 });
    }

    const { error } = await supabase
      .from('candidates')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Candidate record removed successfully.' });
  } catch (err) {
    console.error("DELETE Candidate Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
