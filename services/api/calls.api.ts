import {
  keepPreviousData,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { supabaseUrl } from '@/lib/environment';

// General types
export type CallType = 'incoming' | 'outgoing';

interface Call {
  audio_format: null;
  call_date: null;
  call_type: CallType;
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

export type CallsParams = {
  page?: number;
  pageSize?: number;
  dateFrom?: string | null;
  dateTo?: string | null;
  callType?: CallType | null;
  search?: string | null;
};
export type CallsItem = Call;

export type CallsResponse = {
  data: CallsItem[];
  total: number;
};

export const useCallsQuery = (
  params?: CallsParams,
  queryOptions?: Partial<UseQueryOptions<CallsResponse, PostgrestError>>,
) => {
  return useQuery({
    queryKey: ['calls', params],
    queryFn: async () => {
      const {
        page = 1,
        pageSize = 10,
        dateFrom,
        dateTo,
        callType,
        search,
      } = params || {};

      let query = supabase
        .from('calls')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (dateFrom) {
        query = query.gte('created_at', dateFrom);
      }
      if (dateTo) {
        query = query.lte('created_at', dateTo);
      }
      if (callType) {
        query = query.eq('call_type', callType);
      }
      if (search) {
        query = query.or(
          `client_name.ilike.%${search}%,phone_number.ilike.%${search}%,manager_name.ilike.%${search}%`,
        );
      }
      const { data, error, count } = await query;
      if (error) throw error;

      return {
        data,
        total: count as number,
      };
    },
    placeholderData: keepPreviousData,
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
  callType: CallType;
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

// ============================================================================

export type CallCommentsParams = {
  callId: string;
  page?: number;
  pageSize?: number;
};
export type CallCommentsItem = {
  call_id: string;
  comment_text: string;
  created_at: string;
  id: string;
  user_id: string;
};
export type CallCommentsResponse = {
  comments: CallCommentsItem[];
  count: number;
};

export const useCallCommentsQuery = (
  params: CallCommentsParams,
  queryOptions?: Partial<UseQueryOptions<CallCommentsResponse, PostgrestError>>,
) => {
  return useQuery({
    queryKey: ['call-comments', params],
    queryFn: async () => {
      const { callId, page = 1, pageSize = 10 } = params;

      const { data, error, count } = await supabase
        .from('call_comments')
        .select('*', { count: 'exact' })
        .eq('call_id', callId)
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) throw error;

      return {
        comments: data,
        count: count as number,
      };
    },
    ...queryOptions,
  });
};

// ============================================================================
// Add Call Comment Mutation
// Invalidate: ['call-comments']

export interface AddCallCommentParams {
  callId: string;
  text: string;
}

export const useAddCallCommentMutation = (
  mutationOptions?: UseMutationOptions<void, Error, AddCallCommentParams>,
) => {
  return useMutation({
    mutationFn: async (params) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('No active session');
      }
      const response = await fetch(
        `${supabaseUrl}/functions/v1/add-call-comment`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            call_id: params.callId,
            comment_text: params.text,
          }),
        },
      );
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
    },
    ...mutationOptions,
  });
};

// ============================================================================
// Update Call Comment Mutation
// Invalidate: ['call-comments']

export interface UpdateCallCommentParams {
  commentId: string;
  text: string;
}

export const useUpdateCallCommentMutation = (
  mutationOptions?: UseMutationOptions<void, Error, UpdateCallCommentParams>,
) => {
  return useMutation({
    mutationFn: async (params) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('No active session');
      }
      const response = await fetch(
        `${supabaseUrl}/functions/v1/update-call-comment`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            comment_id: params.commentId,
            comment_text: params.text,
          }),
        },
      );
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
    },
    ...mutationOptions,
  });
};

// ============================================================================
// Delete Call Comment Mutation
// Invalidate: ['call-comments']

export const useDeleteCallCommentMutation = (
  mutationOptions?: UseMutationOptions<void, Error, string>,
) => {
  return useMutation({
    mutationFn: async (comment_id) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('No active session');
      }
      const response = await fetch(
        `${supabaseUrl}/functions/v1/delete-call-comment`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ comment_id }),
        },
      );
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
    },
    ...mutationOptions,
  });
};
