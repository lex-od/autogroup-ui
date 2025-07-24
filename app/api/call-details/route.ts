import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const callId = searchParams.get('id');

    if (!callId) {
      return NextResponse.json(
        { error: 'Missing call ID parameter' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Получаем детали звонка
    const { data: call, error: callError } = await supabase
      .from('calls')
      .select('*')
      .eq('id', callId)
      .single();

    if (callError) {
      return NextResponse.json(
        { error: 'Failed to fetch call details', details: callError.message },
        { status: 500 }
      );
    }

    if (!call) {
      return NextResponse.json(
        { error: 'Call not found' },
        { status: 404 }
      );
    }

    // Форматируем ответ
    const formattedCall = {
      id: call.id,
      phone_number: call.phone_number,
      client_name: call.client_name,
      manager_name: call.manager_name,
      call_type: call.call_type,
      status: call.status,
      duration: call.duration_seconds,
      date: call.call_date || call.created_at,
      created_at: call.created_at,
      updated_at: call.updated_at,
      original_filename: call.original_filename,
      file_size_bytes: call.file_size_bytes,
      audio_format: call.audio_format,
      error_message: call.error_message,
      processing_started_at: call.processing_started_at,
      processing_completed_at: call.processing_completed_at,
      tags: call.tags || [],
      priority: call.priority,
      raw_webhook_data: call.raw_webhook_data
    };

    return NextResponse.json(formattedCall);

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: (error as Error).message },
      { status: 500 }
    );
  }
} 