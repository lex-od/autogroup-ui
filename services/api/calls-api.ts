import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase-config';

interface Call {
  audio_format: null;
  call_date: null;
  call_type: 'incoming' | 'outgoing';
  client_name: string | null;
  created_at: string;
  duration_seconds: number | null;
  error_details: null;
  error_message: string | null;
  file_size_bytes: number;
  id: string;
  manager_name: string | null;
  original_filename: string | null;
  phone_number: string | null;
  priority: 'normal';
  processing_completed_at: string | null;
  processing_started_at: string | null;
  status:
    | 'uploaded'
    | 'processing'
    | 'transcribing'
    | 'analyzing'
    | 'completed'
    | 'failed';
  storage_path: string | null;
  tags: unknown[];
  updated_at: string | null;
  user_id: string | null;
}

export const useCallsQuery = (
  queryOptions?: Partial<UseQueryOptions<Call[], PostgrestError>>,
) => {
  return useQuery({
    queryKey: ['calls'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('calls')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data;
    },
    ...queryOptions,
  });
};
