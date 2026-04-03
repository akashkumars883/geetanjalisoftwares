import { NextResponse } from 'next/server';

export async function GET() {
  const gemini_key = process.env.GEMINI_API_KEY;
  const resend_key = process.env.RESEND_API_KEY;

  const results = {
    gemini_present: !!gemini_key,
    resend_present: !!resend_key,
    gemini_status: 'Checking...',
    resend_status: 'Checking...',
    models: [],
    recommendation: ''
  };

  try {
    if (!gemini_key) {
      results.gemini_status = 'GEMINI_API_KEY is missing';
    } else {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${gemini_key}`);
      const data = await response.json();
      if (data.error) {
        results.gemini_status = `Error: ${data.error.message}`;
      } else {
        results.gemini_status = 'Connected Successfully!';
        results.models = data.models?.map(m => m.name.replace('models/', '')) || [];
      }
    }
  } catch (err) {
    results.gemini_status = `Gemini Network Error: ${err.message}`;
  }

  // Test Resend Connection
  if (resend_key) {
    try {
      const { Resend } = require('resend');
      const resend = new Resend(resend_key);
      const { error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'delivered@resend.dev',
        subject: 'Diagnostic Test',
        html: '<p>Test</p>'
      });
      if (error) {
        results.resend_status = `Resend Error: ${error.message}`;
      } else {
        results.resend_status = 'Connected Successfully! (Sandbox Ready)';
      }
    } catch (err) {
      results.resend_status = `Resend Logic Error: ${err.message}`;
    }
  } else {
    results.resend_status = 'RESEND_API_KEY is missing.';
  }

  return NextResponse.json(results);
}
