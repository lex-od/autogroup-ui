import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosBase } from '@/lib/axios-config';
import { Call, CallStats, AIAnalysis, DashboardFilters } from '@/lib/types';

// Query keys
export const CALLS_QUERY_KEYS = {
  calls: 'calls',
  callStats: 'call-stats',
  aiAnalysis: 'ai-analysis',
  recentCalls: 'recent-calls',
} as const;

// Хук для получения статистики звонков
export const useCallStats = (filters?: Partial<DashboardFilters>) => {
  return useQuery<CallStats>({
    queryKey: [CALLS_QUERY_KEYS.callStats, filters],
    queryFn: async () => {
      const { data } = await axiosBase.get('/calls/stats', {
        params: filters,
      });
      return data;
    },
  });
};

// Хук для получения списка звонков
export const useCalls = (filters?: Partial<DashboardFilters>) => {
  return useQuery<Call[]>({
    queryKey: [CALLS_QUERY_KEYS.calls, filters],
    queryFn: async () => {
      const { data } = await axiosBase.get('/calls', {
        params: filters,
      });
      return data;
    },
  });
};

// Хук для получения последних звонков
export const useRecentCalls = (limit: number = 10) => {
  return useQuery<Call[]>({
    queryKey: [CALLS_QUERY_KEYS.recentCalls, limit],
    queryFn: async () => {
      const { data } = await axiosBase.get(`/calls/recent?limit=${limit}`);
      return data;
    },
  });
};

// Хук для получения AI анализа звонка
export const useCallAIAnalysis = (callId: string) => {
  return useQuery<AIAnalysis>({
    queryKey: [CALLS_QUERY_KEYS.aiAnalysis, callId],
    queryFn: async () => {
      const { data } = await axiosBase.get(`/calls/${callId}/ai-analysis`);
      return data;
    },
    enabled: !!callId,
  });
};

// Мутация для запуска AI анализа звонка
export const useStartAIAnalysis = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (callId: string) => {
      const { data } = await axiosBase.post(`/calls/${callId}/ai-analysis`);
      return data;
    },
    onSuccess: (data, callId) => {
      // Обновляем кэш с новым анализом
      queryClient.invalidateQueries({ queryKey: [CALLS_QUERY_KEYS.aiAnalysis, callId] });
      queryClient.invalidateQueries({ queryKey: [CALLS_QUERY_KEYS.calls] });
    },
  });
};

// Мутация для экспорта данных
export const useExportCalls = () => {
  return useMutation({
    mutationFn: async (filters: Partial<DashboardFilters> & { format: 'pdf' | 'excel' }) => {
      const { data } = await axiosBase.post('/calls/export', filters, {
        responseType: 'blob',
      });
      return data;
    },
  });
}; 