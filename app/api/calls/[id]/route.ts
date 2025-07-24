import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { toCamelCase } from '@/utils/toCamelCase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const authHeader = request.headers.get('Authorization');
    
    console.log('Call details API called:', { id, hasAuthHeader: !!authHeader });
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authHeader || ''
        }
      }
    });

    // Получаем детали звонка
    const { data: call, error: callError } = await supabase
      .from('calls')
      .select('*')
      .eq('id', id)
      .single();

    console.log('Call details query result:', { call: !!call, error: callError?.message });

    if (callError) {
      console.error('Error fetching call:', callError);
      if (callError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Звонок не найден' },
          { status: 404 }
        );
      }
      throw callError;
    }

    // Формируем объект звонка с camelCase ключами
    const camelCall = {
      id: call.id,
      userId: call.user_id,
      originalFilename: call.original_filename,
      storagePath: call.storage_path,
      fileSizeBytes: call.file_size_bytes,
      duration: call.duration_seconds,
      callType: call.call_type,
      phoneNumber: call.phone_number,
      clientName: call.client_name,
      managerName: call.manager_name,
      status: call.status,
      processingStartedAt: call.processing_started_at,
      processingCompletedAt: call.processing_completed_at,
      errorMessage: call.error_message,
      callDate: call.call_date,
      createdAt: call.created_at,
      updatedAt: call.updated_at
    };
    
    console.log('Returning call details:', { id: camelCall.id, status: camelCall.status });
    
    return NextResponse.json(camelCall);
  } catch (error) {
    console.error('Call details API error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
