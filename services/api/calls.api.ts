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
// We use them only in general components

export type CallType = 'incoming' | 'outgoing';

export type CallStatus =
  | 'uploaded'
  | 'processing'
  | 'transcribing'
  | 'analyzing'
  | 'completed'
  | 'failed';

interface Call {
  audio_format: null;
  binotel_account_id: null;
  binotel_status: null;
  call_date: string | null;
  call_ended_at: string | null;
  call_started_at: string | null;
  call_transfer_info: null;
  call_type: CallType;
  client_name: string | null;
  company_number: string | null;
  company_number_name: string | null;
  created_at: string;
  customer_number: null;
  dst: null;
  duration_seconds: number | null;
  employee_info: null;
  error_details: null;
  error_message: string | null;
  event_type: 'call_recording_ready' | 'call_end' | 'incoming_call' | null;
  external_id: null;
  file_size_bytes: number | null;
  id: string;
  internal_number: null;
  manager_name: string | null; // ? string
  missed_call_reason: null;
  original_filename: string | null;
  original_link: string | null;
  phone_number: string | null;
  priority: 'normal';
  processing_completed_at: string | null;
  processing_started_at: string | null;
  raw_webhook_data: null;
  recording_status: 'pending';
  source: 'manual';
  status: CallStatus;
  storage_path: string | null;
  tags: unknown[];
  updated_at: string | null; // ? string
  user_id: string | null; // ? string
  wait_time: null;
  webhook_signature: string | null;
  webhook_source_ip: string | null;
  webhook_timestamp: string | null;
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
// Call Transcript Query

export interface TranscriptSegmentItem {
  confidence: number | null;
  end_ms: number;
  name: string | null;
  role: string | null;
  speaker: string;
  start_ms: number;
  text: string;
}
export type CallTranscriptResponse = {
  all_results: unknown[];
  all_results_count: number;
  best_result_id: string | null;
  call_id: string;
  comparison_metadata: object; // ?
  created_at: string;
  full_text: string;
  google_result: null;
  id: string;
  language: string;
  lead_quality: null;
  model_used: string;
  overall_confidence: number | null;
  processing_time_ms: number;
  raw_response: null;
  retry_count: number;
  roles_verified_by_ai: boolean;
  segments: TranscriptSegmentItem[];
  silence_duration_ms: number | null;
  speaker_labels: object; // ?
  speakers_count: number;
  wer_score: null;
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
// Call Analysis Query

export type CallAnalysisResponse = {
  action_items: string[];
  action_items_for_client: string[];
  action_items_for_manager: string[];
  call_date: null;
  call_duration_seconds: number | null;
  call_id: string;
  call_outcome: {
    specific_outcome_details?: string | null; // ? string
    status?: string | null; // ? string
  };
  call_purpose: string | null;
  call_time: null;
  client_confidence_score: null;
  client_needs: string[];
  client_objections_concerns: string[];
  client_readiness: 'высокая' | null;
  client_satisfaction_score: number | null;
  compliance_issues: string[];
  consultation_completeness: 'полная' | null;
  created_at: string;
  expected_deal_size: 'низкий' | null;
  follow_up_priority: 'низкий' | null;
  id: string;
  identified_names: string[];
  insights: {
    call_outcome?: string | null; // ? string | undefined
    call_purpose?: string | null; // ? string | undefined
    client_readiness?: 'высокая' | 'средняя' | null; // ? string
    expected_deal_size?: 'низкий' | 'неизвестно' | null; // ? string
    follow_up_priority?: 'средний' | 'низкий' | null; // ? string
  };
  key_phrases: string[];
  manager_confidence_score: number | null;
  manager_politeness: 'да' | null;
  manager_strengths: string[];
  missed_opportunities: string[];
  model_used: string;
  participants_roles: Array<{
    name: string | null; // ? string
    role_detail: string | null; // ? string
    speaker_type: string | null; // ? string
  }>;
  processing_time_ms: number;
  product_service_interest: {
    brand_model_car?: string | null; // ? string | undefined
    budget_discussed_rub?: number | null; // ? number | undefined
    currency?: string | null; // ? string | undefined
    desired_configuration?: string | null; // ? string | undefined
    desired_year?: string | null; // ? string | undefined
    parts_description?: string | null; // ? string | undefined
    service_type?: string | null; // ? string | undefined
  };
  raw_response: string | null;
  recommended_next_steps: string[];
  sentiment_confidence: number; // 0.0 to 1.0
  sentiment_label: 'positive' | 'neutral' | 'negative' | 'Позитивный';
  sentiment_score: number; // 0.0 to 1.0
  service_quality_score: number; // 1 to 5
  service_script_checklist: {
    checklist_items?: Array<{
      criterion: string;
      item_number: number;
      reason: string;
      score: number;
      status: 'выполнено' | 'не_выполнено' | 'неприменимо';
      type: 'Обязательный' | 'Контекстный';
    }>;
    is_applicable?: boolean;
    max_possible_score_checklist?: number | null; // ? number | undefined
    total_score_checklist?: number | null; // ? number | undefined
  };
  summary: string | null; // ? string
  summary_text: string | null;
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
