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

    // Получаем AI анализ звонка
    const { data: analysis, error: analysisError } = await supabase
      .from('ai_analysis')
      .select('*')
      .eq('call_id', callId)
      .single();

    if (analysisError) {
      if (analysisError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'AI analysis not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to fetch AI analysis', details: analysisError.message },
        { status: 500 }
      );
    }

    // Форматируем ответ
    const formattedAnalysis = {
      id: analysis.id,
      call_id: analysis.call_id,
      sentiment_label: analysis.sentiment_label,
      sentiment_score: analysis.sentiment_score,
      sentiment_confidence: analysis.sentiment_confidence,
      topics: analysis.topics,
      action_items: analysis.action_items,
      summary: analysis.summary,
      key_phrases: analysis.key_phrases,
      service_quality_score: analysis.service_quality_score,
      missed_opportunities: analysis.missed_opportunities,
      compliance_issues: analysis.compliance_issues,
      insights: analysis.insights,
      client_readiness: analysis.client_readiness,
      expected_deal_size: analysis.expected_deal_size,
      follow_up_priority: analysis.follow_up_priority,
      model_used: analysis.model_used,
      processing_time_ms: analysis.processing_time_ms,
      tokens_used: analysis.tokens_used,
      created_at: analysis.created_at,
      call_purpose: analysis.call_purpose,
      call_outcome: analysis.call_outcome,
      product_service_interest: analysis.product_service_interest,
      client_needs: analysis.client_needs,
      client_objections_concerns: analysis.client_objections_concerns,
      manager_politeness: analysis.manager_politeness,
      consultation_completeness: analysis.consultation_completeness,
      manager_strengths: analysis.manager_strengths,
      action_items_for_manager: analysis.action_items_for_manager,
      action_items_for_client: analysis.action_items_for_client,
      recommended_next_steps: analysis.recommended_next_steps,
      service_script_checklist: analysis.service_script_checklist,
      summary_text: analysis.summary_text,
      raw_response: analysis.raw_response
    };

    return NextResponse.json(formattedAnalysis);

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: (error as Error).message },
      { status: 500 }
    );
  }
} 