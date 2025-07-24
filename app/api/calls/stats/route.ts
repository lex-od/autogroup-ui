import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { CallStats } from '@/services/api/calls-api';
import { toCamelCase } from '@/utils/toCamelCase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authHeader || ''
        }
      }
    });

    // Получаем основную статистику звонков
    const { data: callsData, error: callsError } = await supabase
      .from('calls')
      .select(`
        id,
        status,
        duration_seconds,
        call_type,
        manager_name,
        created_at
      `);

    if (callsError) {
      console.error('Error fetching calls:', callsError);
      throw callsError;
    }

    // Получаем данные AI анализа для sentiment
    const { data: analysisData, error: analysisError } = await supabase
      .from('ai_analysis')
      .select(`
        call_id,
        sentiment_score,
        client_satisfaction_score
      `);

    if (analysisError) {
      console.error('Error fetching AI analysis:', analysisError);
      throw analysisError;
    }

    // Обрабатываем данные для статистики
    const totalCalls = callsData?.length || 0;
    const completedCalls = callsData?.filter(call => call.status === 'completed').length || 0;
    const missedCalls = callsData?.filter(call => call.status === 'failed' || call.status === 'uploaded').length || 0;
    
    // Вычисляем среднюю продолжительность (только для завершенных звонков)
    const completedCallsWithDuration = callsData?.filter(call => 
      call.status === 'completed' && call.duration_seconds
    ) || [];
    const averageDuration = completedCallsWithDuration.length > 0
      ? Math.round(completedCallsWithDuration.reduce((sum, call) => sum + (call.duration_seconds || 0), 0) / completedCallsWithDuration.length)
      : 0;

    // Вычисляем средний sentiment
    const validSentiments = analysisData?.filter(analysis => 
      analysis.sentiment_score !== null && analysis.sentiment_score !== undefined
    ) || [];
    const averageSentiment = validSentiments.length > 0
      ? validSentiments.reduce((sum, analysis) => sum + (analysis.sentiment_score || 0), 0) / validSentiments.length
      : 0;

    // Вычисляем conversion rate (завершенные звонки / всего звонков)
    const conversionRate = totalCalls > 0 ? completedCalls / totalCalls : 0;

    // Группируем по менеджерам для топ-исполнителей
    const managerStats = new Map();
    
    callsData?.forEach(call => {
      if (!call.manager_name) return;
      
      if (!managerStats.has(call.manager_name)) {
        managerStats.set(call.manager_name, {
          managerName: call.manager_name,
          callsCount: 0,
          totalSentiment: 0,
          sentimentCount: 0,
          managerId: call.manager_name.toLowerCase().replace(/\s+/g, '-') // Простой ID
        });
      }
      
      const stats = managerStats.get(call.manager_name);
      stats.callsCount++;
      
      // Добавляем sentiment если есть
      const analysis = analysisData?.find(a => a.call_id === call.id);
      if (analysis && analysis.sentiment_score !== null) {
        stats.totalSentiment += analysis.sentiment_score;
        stats.sentimentCount++;
      }
    });

    // Формируем топ-исполнителей с расчетом среднего sentiment
    const topPerformers = Array.from(managerStats.values())
      .map(stats => ({
        managerId: stats.managerId,
        managerName: stats.managerName,
        callsCount: stats.callsCount,
        avgSentiment: stats.sentimentCount > 0 
          ? stats.totalSentiment / stats.sentimentCount 
          : 0
      }))
      .sort((a, b) => b.callsCount - a.callsCount) // Сортируем по количеству звонков
      .slice(0, 5); // Берем топ-5

    // Вычисляем звонки за сегодня
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCalls = callsData?.filter(call => {
      const callDate = new Date(call.created_at);
      return callDate >= today;
    }).length || 0;

    // Подготавливаем данные в ожидаемом формате для фронтенда
    // Формируем stats с camelCase ключами
    const stats = {
      totalCalls,
      todayCalls,
      completedCalls,
      failedCalls: missedCalls,
      avgDuration: averageDuration,
      avgServiceQuality: averageSentiment > 0 ? Math.round((averageSentiment + 1) * 2.5) : 3,
      topSentiments: [
        { sentiment: 'positive', count: callsData?.filter(call => {
          const analysis = analysisData?.find(a => a.call_id === call.id);
          return analysis?.sentiment_score && analysis.sentiment_score > 0.2;
        }).length || 0 },
        { sentiment: 'neutral', count: callsData?.filter(call => {
          const analysis = analysisData?.find(a => a.call_id === call.id);
          return analysis?.sentiment_score && analysis.sentiment_score >= -0.2 && analysis.sentiment_score <= 0.2;
        }).length || 0 },
        { sentiment: 'negative', count: callsData?.filter(call => {
          const analysis = analysisData?.find(a => a.call_id === call.id);
          return analysis?.sentiment_score && analysis.sentiment_score < -0.2;
        }).length || 0 }
      ],
      topTopics: [],
      managerStats: topPerformers.map(performer => ({
        manager: performer.managerName,
        calls: performer.callsCount,
        avgQuality: Math.round((performer.avgSentiment + 1) * 2.5)
      })),
      topPerformers
    };
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching call stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch call stats' },
      { status: 500 }
    );
  }
} 