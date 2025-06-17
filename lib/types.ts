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

export interface AIAnalysis {
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

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

export interface DateRange {
  from: Date;
  to: Date;
}

export interface DashboardFilters {
  dateRange: DateRange;
  managers: string[];
  callTypes: ('incoming' | 'outgoing')[];
  sentiments: ('positive' | 'negative' | 'neutral')[];
  statuses: ('completed' | 'missed' | 'in-progress')[];
} 