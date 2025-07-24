import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'API работает',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    timestamp: new Date().toISOString()
  });
} 