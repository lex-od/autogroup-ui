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

    // Получаем транскрипцию звонка
    const { data: transcript, error: transcriptError } = await supabase
      .from('transcripts')
      .select('*')
      .eq('call_id', callId)
      .single();

    if (transcriptError) {
      if (transcriptError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Transcript not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to fetch transcript', details: transcriptError.message },
        { status: 500 }
      );
    }

    // Форматируем ответ
    const formattedTranscript = {
      id: transcript.id,
      call_id: transcript.call_id,
      full_text: transcript.full_text,
      segments: transcript.segments,
      language: transcript.language,
      speakers_count: transcript.speakers_count,
      speaker_labels: transcript.speaker_labels,
      overall_confidence: transcript.overall_confidence,
      word_count: transcript.word_count,
      model_used: transcript.model_used,
      processing_time_ms: transcript.processing_time_ms,
      created_at: transcript.created_at,
      lead_quality: transcript.lead_quality,
      roles_verified_by_ai: transcript.roles_verified_by_ai
    };

    return NextResponse.json(formattedTranscript);

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: (error as Error).message },
      { status: 500 }
    );
  }
} 