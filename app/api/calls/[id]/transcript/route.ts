import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Получаем транскрипцию звонка
    const { data: transcript, error: transcriptError } = await supabase
      .from('transcripts')
      .select('*')
      .eq('call_id', id)
      .single();

    if (transcriptError) {
      console.error('Error fetching transcript:', transcriptError);
      if (transcriptError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Транскрипция не найдена' },
          { status: 404 }
        );
      }
      throw transcriptError;
    }

    return NextResponse.json(transcript);
  } catch (error) {
    console.error('Transcript API error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 