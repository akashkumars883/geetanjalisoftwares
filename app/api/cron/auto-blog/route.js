import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    message: 'Auto-blog system is disabled.',
    disabled: true
  }, { status: 200 });
}

export async function POST() {
  return NextResponse.json({
    message: 'Auto-blog system is disabled.',
    disabled: true
  }, { status: 200 });
}