import { NextResponse } from 'next/server';
import { runAutoBlogCycle } from '@/lib/ai-blog-engine';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    // 1. Authorization Check
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    // In development or if secret is missing, we can use a query param for testing
    const url = new URL(request.url);
    const querySecret = url.searchParams.get('secret');

    if (cronSecret && authHeader !== `Bearer ${cronSecret}` && querySecret !== cronSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Run the Auto-Blog Engine
    const result = await runAutoBlogCycle();
    
    return NextResponse.json({
      message: 'Daily blog automation successful!',
      title: result.blog.title,
      id: result.blog.id
    }, { status: 200 });

  } catch (error) {
    console.error('CRON ERROR: Auto-Blog failed:', error);
    return NextResponse.json({ 
      error: 'Automation failed', 
      details: error.message 
    }, { status: 500 });
  }
}

// Support POST for manual triggers from dashboard if needed
export async function POST(request) {
  return GET(request);
}
