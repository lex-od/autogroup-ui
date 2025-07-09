import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosBase } from '@/lib/axios-config';

// Типы для звонков и аналитики
export interface Call {
  id: string;
  phoneNumber: string;
  clientName: string;
  managerName: string;
  duration: number; // в секундах
  date: string;
  type: 'incoming' | 'outgoing';
  status: 'completed' | 'missed' | 'in-progress';
  recordingUrl?: string;
  aiAnalysis?: AIAnalysis;
}

interface AIAnalysis {
  id: string;
  callId: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number; // от -1 до 1
  keyTopics: string[];
  summary: string;
  actionItems: string[];
  leadQuality: 'hot' | 'warm' | 'cold';
  satisfaction: number; // от 1 до 5
  transcription?: string;
}

export interface CallStats {
  totalCalls: number;
  completedCalls: number;
  missedCalls: number;
  averageDuration: number;
  averageSentiment: number;
  conversionRate: number;
  topPerformers: {
    managerId: string;
    managerName: string;
    callsCount: number;
    avgSentiment: number;
  }[];
}

// Хуки для звонков
export const useCallStats = () => {
  return useQuery<CallStats>({
    queryKey: ['call-stats'],
    queryFn: async () => {
      const { data } = await axiosBase.get('/calls/stats');
      return data;
    },
  });
};

export const useRecentCalls = (limit = 5) => {
  return useQuery<Call[]>({
    queryKey: ['recent-calls', limit],
    queryFn: async () => {
      const { data } = await axiosBase.get('/calls/recent', {
        params: { limit },
      });
      return data;
    },
  });
};

// Мутации
export const useStartAIAnalysis = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (callId: string) => {
      const { data } = await axiosBase.post(`/calls/${callId}/ai-analysis`);
      return data;
    },
    onSuccess: (_, callId) => {
      queryClient.invalidateQueries({ queryKey: ['call-ai-analysis', callId] });
      queryClient.invalidateQueries({ queryKey: ['call', callId] });
      queryClient.invalidateQueries({ queryKey: ['calls'] });
    },
  });
};

// interface CallsParams {
//   limit?: number;
//   offset?: number;
//   search?: string;
//   status?: string;
//   type?: string;
//   sentiment?: string;
//   manager?: string;
//   dateFrom?: string;
//   dateTo?: string;
// }
// interface ExportParams {
//   format: 'csv' | 'xlsx';
//   calls?: string[];
//   filters?: CallsParams;
// }

// export const useExportCalls = () => {
//   return useMutation({
//     mutationFn: async (params: ExportParams) => {
//       const response = await axiosBase.post('/calls/export', params, {
//         responseType: 'blob',
//       });

//       // Создаем URL для скачивания файла
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;

//       // Определяем имя файла и расширение
//       const filename = `calls-export-${new Date().toISOString().split('T')[0]}.${params.format}`;
//       link.setAttribute('download', filename);

//       // Инициируем скачивание
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       return response.data;
//     },
//   });
// };

export const useDeleteCall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (callId: string) => {
      const { data } = await axiosBase.delete(`/calls/${callId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calls'] });
      queryClient.invalidateQueries({ queryKey: ['recent-calls'] });
      queryClient.invalidateQueries({ queryKey: ['call-stats'] });
    },
  });
};

export const useDeleteCalls = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (callIds: string[]) => {
      const { data } = await axiosBase.delete('/calls', {
        data: { callIds },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calls'] });
      queryClient.invalidateQueries({ queryKey: ['recent-calls'] });
      queryClient.invalidateQueries({ queryKey: ['call-stats'] });
    },
  });
};
