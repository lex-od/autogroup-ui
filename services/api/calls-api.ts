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
import { axiosBase as axiosClient } from '@/lib/axios-config';

// General types
export type CallType = 'incoming' | 'outgoing';

export interface Call {
  id: string;
  phoneNumber: string | null;
  clientName: string | null;
  managerName: string | null;
  duration: number | null;
  callDate: string | null;
  createdAt: string;
  callType: CallType;
  status: 'uploaded' | 'processing' | 'transcribing' | 'analyzing' | 'completed' | 'failed';
  storagePath?: string;
  aiAnalysis?: any;
}

// ============================================================================
// Calls Stats API
// ============================================================================

export interface CallStats {
  totalCalls: number;
  todayCalls: number;
  completedCalls: number;
  failedCalls: number;
  avgDuration: number;
  avgServiceQuality: number;
  topSentiments: Array<{ sentiment: string; count: number }>;
  topTopics: Array<{ topic: string; count: number }>;
  managerStats: Array<{
    manager: string;
    calls: number;
    avgQuality: number;
  }>;
}

export const useCallStatsQuery = (
  queryOptions?: Partial<UseQueryOptions<CallStats, Error>>,
) => {
  return useQuery({
    queryKey: ['call-stats'],
    queryFn: async () => {
      const response = await axiosClient.get('/calls/stats');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 минут
    ...queryOptions,
  });
};

// ============================================================================
// Calls List API (updated to use API endpoint)
// ============================================================================

export type CallsParams = {
  page?: number;
  pageSize?: number;
  dateFrom?: string | null;
  dateTo?: string | null;
  callType?: CallType | null;
  search?: string | null;
  status?: Call['status'] | null;
  manager?: string | null;
  sentiment?: string | null;
};
export type CallsItem = Call;

export type CallsResponse = {
  data: CallsItem[];
  total: number;
  page: number;
  totalPages: number;
};

export const useCallsQuery = (
  params?: CallsParams,
  queryOptions?: Partial<UseQueryOptions<CallsResponse, Error>>,
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
        status,
        manager,
        sentiment,
      } = params || {};

      // Используем новый API endpoint для поиска, если есть поисковый запрос или фильтры
      if (search || status || manager || sentiment || dateFrom || dateTo || callType) {
        const searchParams = new URLSearchParams();
        if (search) searchParams.append('q', search);
        if (status) searchParams.append('status', status);
        if (manager) searchParams.append('manager', manager);
        if (sentiment) searchParams.append('sentiment', sentiment);
        if (dateFrom) searchParams.append('dateFrom', dateFrom);
        if (dateTo) searchParams.append('dateTo', dateTo);
        if (callType) searchParams.append('type', callType);
        searchParams.append('limit', pageSize.toString());
        searchParams.append('offset', ((page - 1) * pageSize).toString());

        const response = await axiosClient.get(`/calls/search?${searchParams.toString()}`);
        return {
          data: response.data.results,
          total: response.data.total,
          page,
          totalPages: Math.ceil(response.data.total / pageSize),
        };
      } else {
        // Используем API для получения последних звонков с корректной пагинацией
        const response = await axiosClient.get(
          `/calls/recent?limit=${pageSize}&offset=${(page - 1) * pageSize}`
        );
        return {
          data: response.data.calls,
          total: response.data.total,
          page,
          totalPages: Math.ceil(response.data.total / pageSize),
        };
      }
    },
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000, // 30 секунд
    ...queryOptions,
  });
};

// ============================================================================

export type CallDetailsResponse = Call;

export const useCallDetailsQuery = (
  id: string,
  queryOptions?: Partial<UseQueryOptions<CallDetailsResponse, Error>>,
) => {
  return useQuery({
    queryKey: ['call-details', id],
    queryFn: async () => {
      const response = await axiosClient.get(`/calls/${id}`);
      return response.data;
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
    UseQueryOptions<CallTranscriptResponse, Error>
  >,
) => {
  return useQuery({
    queryKey: ['call-transcript', id],
    queryFn: async () => {
      const response = await axiosClient.get(`/calls/${id}/transcript`);
      return response.data;
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
  queryOptions?: Partial<UseQueryOptions<CallAnalysisResponse, Error>>,
) => {
  return useQuery({
    queryKey: ['call-analysis', id],
    queryFn: async () => {
      const response = await axiosClient.get(`/calls/${id}/ai-analysis`);
      return response.data;
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