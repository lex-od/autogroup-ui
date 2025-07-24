import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const status = searchParams.get('status');
    const manager = searchParams.get('manager');
    const sentiment = searchParams.get('sentiment');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const type = searchParams.get('type');
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

    // Строим запрос с фильтрами
    let query = supabase
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
      `);

    // Применяем фильтры
    if (q) {
      query = query.or(`client_name.ilike.%${q}%,phone_number.ilike.%${q}%,manager_name.ilike.%${q}%`);
    }
    if (status) {
      query = query.eq('status', status);
    }
    if (manager) {
      query = query.ilike('manager_name', `%${manager}%`);
    }
    if (type) {
      query = query.eq('call_type', type);
    }
    if (dateFrom) {
      query = query.gte('created_at', dateFrom);
    }
    if (dateTo) {
      query = query.lte('created_at', dateTo);
    }

    // Строим запрос для подсчета общего количества
    let countQuery = supabase
      .from('calls')
      .select('*', { count: 'exact', head: true });

    // Применяем те же фильтры к запросу подсчета
    if (q) {
      countQuery = countQuery.or(`client_name.ilike.%${q}%,phone_number.ilike.%${q}%,manager_name.ilike.%${q}%`);
    }
    if (status) {
      countQuery = countQuery.eq('status', status);
    }
    if (manager) {
      countQuery = countQuery.ilike('manager_name', `%${manager}%`);
    }
    if (type) {
      countQuery = countQuery.eq('call_type', type);
    }
    if (dateFrom) {
      countQuery = countQuery.gte('created_at', dateFrom);
    }
    if (dateTo) {
      countQuery = countQuery.lte('created_at', dateTo);
    }

    // Получаем общее количество записей
    const { count, error: countError } = await countQuery;

    if (countError) {
      console.error('Error counting calls:', countError);
    }

    // Получаем данные с пагинацией
    const { data: callsData, error: callsError } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (callsError) {
      console.error('Error fetching calls:', callsError);
      throw callsError;
    }

    if (!callsData || callsData.length === 0) {
      return NextResponse.json({
        results: [],
        total: 0
      });
    }

    // Если есть фильтр по настроению, получаем AI анализ
    let analysisData: any[] | null = null;
    if (sentiment) {
      const callIds = callsData.map(call => call.id);
      const { data: aiData, error: analysisError } = await supabase
        .from('ai_analysis')
        .select(`
          call_id,
          sentiment_label,
          sentiment_score
        `)
        .in('call_id', callIds);

      if (!analysisError && aiData) {
        analysisData = aiData;
      }
    }

    // Формируем результаты
    const results = callsData.map(call => {
      const formattedPhone = call.phone_number 
        ? call.phone_number.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5')
        : 'Неизвестно';

      const result: any = {
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

      // Если есть фильтр по настроению, проверяем соответствие
      if (sentiment && analysisData) {
        const analysis = analysisData.find((a: any) => a.call_id === call.id);
        if (analysis) {
          let callSentiment = 'neutral';
          if (analysis.sentiment_score !== null) {
            if (analysis.sentiment_score > 0.2) callSentiment = 'positive';
            else if (analysis.sentiment_score < -0.2) callSentiment = 'negative';
          }
          
          // Если настроение не соответствует фильтру, исключаем звонок
          if (callSentiment !== sentiment) {
            return null;
          }
        }
      }

      return result;
    }).filter(Boolean); // Удаляем null значения

    return NextResponse.json({
      results,
      total: count || results.length
    });
  } catch (error) {
    console.error('Error searching calls:', error);
    return NextResponse.json(
      { error: 'Failed to search calls' },
      { status: 500 }
    );
  }
}