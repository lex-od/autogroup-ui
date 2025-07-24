import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Call } from '@/services/api/queries/calls.queries';
import { toCamelCase } from '@/utils/toCamelCase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    const authHeader = request.headers.get('Authorization');
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authHeader || ''
        }
      }
    });

    // Получаем последние звонки с основными данными с поддержкой пагинации
    const { data: callsData, error: callsError } = await supabase
      .from('calls')
      .select(`
        id,
        phone_number,
        client_name,
        manager_name,
        duration_seconds,
        call_date,
        call_type,
        status,
        storage_path,
        created_at
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (callsError) {
      console.error('Error fetching calls:', callsError);
      throw callsError;
    }

    if (!callsData || callsData.length === 0) {
      return NextResponse.json({
        calls: [],
        total: 0
      });
    }

    // Получаем AI анализ для этих звонков
    const callIds = callsData.map(call => call.id);
    const { data: analysisData, error: analysisError } = await supabase
      .from('ai_analysis')
      .select(`
        call_id,
        sentiment_label,
        sentiment_score,
        topics,
        summary_text,
        action_items_for_manager,
        client_satisfaction_score
      `)
      .in('call_id', callIds);

    if (analysisError) {
      console.error('Error fetching AI analysis:', analysisError);
      // Не бросаем ошибку, просто логируем - анализ может отсутствовать
    }

    // Формируем массив звонков с camelCase ключами
    const formattedCalls = callsData.map(call => {
      const analysis = analysisData?.find(a => a.call_id === call.id);
      const formattedPhone = call.phone_number 
        ? call.phone_number.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5')
        : 'Неизвестно';
      const formattedCall: any = {
        id: call.id,
        phoneNumber: formattedPhone,
        clientName: call.client_name || 'Неизвестно',
        managerName: call.manager_name || 'Неизвестно',
        duration: call.duration_seconds || 0,
        callDate: call.call_date || call.created_at,
        callType: call.call_type,
        status: call.status,
        recordingUrl: call.storage_path ? `/api/audio/${call.id}` : undefined
      };
      if (analysis) {
        let sentiment = 'neutral';
        if (analysis.sentiment_score !== null) {
          if (analysis.sentiment_score > 0.2) sentiment = 'positive';
          else if (analysis.sentiment_score < -0.2) sentiment = 'negative';
        }
        let leadQuality = 'warm';
        if (analysis.sentiment_score !== null && analysis.client_satisfaction_score !== null) {
          if (analysis.sentiment_score > 0.5 && analysis.client_satisfaction_score >= 4) {
            leadQuality = 'hot';
          } else if (analysis.sentiment_score < -0.2 || analysis.client_satisfaction_score <= 2) {
            leadQuality = 'cold';
          }
        }
        formattedCall.aiAnalysis = {
          id: `ai-${call.id}`,
          callId: call.id,
          sentiment,
          sentimentScore: analysis.sentiment_score || 0,
          keyTopics: Array.isArray(analysis.topics) ? analysis.topics : [],
          summary: analysis.summary_text || 'Анализ недоступен',
          actionItems: Array.isArray(analysis.action_items_for_manager) 
            ? analysis.action_items_for_manager 
            : [],
          leadQuality,
          satisfaction: analysis.client_satisfaction_score || 3,
          transcription: undefined
        };
      }
      return formattedCall;
    });

    // Получаем общее количество звонков для пагинации
    const { count, error: countError } = await supabase
      .from('calls')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Error counting calls:', countError);
    }

    return NextResponse.json({
      calls: formattedCalls,
      total: count || formattedCalls.length
    });
  } catch (error) {
    console.error('Error fetching recent calls:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent calls' },
      { status: 500 }
    );
  }
} 