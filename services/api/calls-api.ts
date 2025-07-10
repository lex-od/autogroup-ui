import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { supabaseUrl } from '@/lib/environment';

// General types

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
  storage_path: string;
  tags: unknown[];
  updated_at: string | null;
  user_id: string | null;
}

// ============================================================================

export type CallsItem = Call;

export const useCallsQuery = (
  queryOptions?: Partial<UseQueryOptions<CallsItem[], PostgrestError>>,
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

// ============================================================================

export type CallDetailsResponse = Call;

export const useCallDetailsQuery = (
  id: string,
  queryOptions?: Partial<UseQueryOptions<CallDetailsResponse, PostgrestError>>,
) => {
  return useQuery({
    queryKey: ['call-details', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('calls')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return data;
    },
    ...queryOptions,
  });
};

// ============================================================================

export interface TranscriptSegmentItem {
  confidence: number | null;
  end_ms: number;
  speaker: string;
  start_ms: number;
  text: string;
}

export type CallTranscriptResponse = {
  call_id: string;
  created_at: string;
  full_text: string;
  id: string;
  language: string;
  model_used: string;
  overall_confidence: number | null;
  processing_time_ms: number;
  retry_count: number;
  segments: TranscriptSegmentItem[];
  silence_duration_ms: number | null;
  speaker_labels: unknown;
  speakers_count: number;
  word_count: number;
};

export const useCallTranscriptQuery = (
  id: string,
  queryOptions?: Partial<
    UseQueryOptions<CallTranscriptResponse, PostgrestError>
  >,
) => {
  return useQuery({
    queryKey: ['call-transcript', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transcripts')
        .select('*')
        .eq('call_id', id)
        .single();

      if (error) throw error;

      return data;
    },
    ...queryOptions,
  });
};

// ============================================================================

export type CallAnalysisResponse = {
  action_items: string[];
  call_id: string;
  client_readiness: null;
  compliance_issues: string[];
  created_at: string;
  expected_deal_size: null;
  follow_up_priority: null;
  id: string;
  insights: {
    client_readiness: 'высокая' | null;
    expected_deal_size: 'высокий' | 'средний' | null;
    follow_up_priority: 'высокий' | 'средний' | null;
  };
  key_phrases: string[];
  missed_opportunities: string[];
  model_used: string;
  processing_time_ms: number;
  sentiment_confidence: number; // 0.0 to 1.0
  sentiment_label: 'positive' | 'neutral' | 'negative';
  sentiment_score: number; // -1.0 to 1.0
  service_quality_score: number; // 1-5
  summary: string;
  tokens_used: null;
  topics: string[];
};

export const useCallAnalysisQuery = (
  id: string,
  queryOptions?: Partial<UseQueryOptions<CallAnalysisResponse, PostgrestError>>,
) => {
  return useQuery({
    queryKey: ['call-analysis', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_analysis')
        .select('*')
        .eq('call_id', id)
        .single();

      if (error) throw error;

      return data;
    },
    ...queryOptions,
  });
};

// ============================================================================
// Upload Call Mutation
// Invalidate: ['calls']

export interface UploadCallParams {
  file: File;
  managerName: string;
  callType: 'incoming' | 'outgoing';
  phoneNumber?: string;
  clientName?: string;
}

export const useUploadCallMutation = (
  mutationOptions?: UseMutationOptions<void, Error, UploadCallParams>,
) => {
  return useMutation({
    mutationFn: async (params) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('No active session');
      }

      const formData = new FormData();
      formData.append('file', params.file);
      formData.append('managerName', params.managerName);
      formData.append('callType', params.callType);

      if (params.clientName) {
        formData.append('clientName', params.clientName);
      }
      if (params.phoneNumber) {
        formData.append('phoneNumber', params.phoneNumber);
      }

      const response = await fetch(
        `${supabaseUrl}/functions/v1/upload-handler`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          body: formData,
        },
      );
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
    },
    ...mutationOptions,
  });
};
