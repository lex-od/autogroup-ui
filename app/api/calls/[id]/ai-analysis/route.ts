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
    const authHeader = request.headers.get('Authorization');
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authHeader || ''
        }
      }
    });

    // Получаем AI-анализ звонка
    const { data: analysis, error: analysisError } = await supabase
      .from('ai_analysis')
      .select('*')
      .eq('call_id', id)
      .single();

    if (analysisError) {
      console.error('Error fetching AI analysis:', analysisError);
      if (analysisError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'AI-анализ не найден' },
          { status: 404 }
        );
      }
      throw analysisError;
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('AI Analysis API error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}