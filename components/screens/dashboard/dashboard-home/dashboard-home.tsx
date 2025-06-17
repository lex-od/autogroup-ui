'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  useCallStats, 
  useRecentCalls, 
  useStartAIAnalysis
} from '@/services/api/queries/calls.queries';

// Импорт компонентов (убираем DashboardHeader)
import CallStatsCards from './components/call-stats-cards';
import RecentCallsTable from './components/recent-calls-table';
import AIInsightsPanel from './components/ai-insights-panel';
import AnalyticsCharts from './components/analytics-charts';
import TopPerformers from './components/top-performers';
import QuickActions from './components/quick-actions';

const DashboardHome = () => {
  const router = useRouter();
  const [filters] = useState({});

  // React Query хуки
  const { data: callStats, isLoading: statsLoading } = useCallStats(filters);
  const { data: recentCalls, isLoading: callsLoading } = useRecentCalls(10);
  const { mutate: startAIAnalysis, isPending: isAnalyzing } = useStartAIAnalysis();

  // Обработчики
  const handleAnalyzeCall = (callId: string) => {
    startAIAnalysis(callId, {
      onSuccess: () => {
        console.log('AI analysis started for call:', callId);
      },
      onError: (error) => {
        console.error('AI analysis failed:', error);
      },
    });
  };

  const handlePlayRecording = (callId: string) => {
    router.push(`/dashboard/calls/${callId}`);
  };

  return (
    <div className="w-full h-full">
      <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
        {/* Основные метрики */}
        <section>
          <CallStatsCards
            stats={callStats}
            isLoading={statsLoading}
          />
        </section>

        {/* Графики аналитики */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Аналитика</h2>
            <p className="text-muted-foreground text-sm">
              Подробные графики и тренды по звонкам
            </p>
          </div>
          <AnalyticsCharts
            stats={callStats}
            isLoading={statsLoading}
          />
        </section>

        {/* Основной контент */}
        <section>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Последние звонки */}
            <div className="xl:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Последние звонки</h2>
                <p className="text-muted-foreground text-sm">
                  Нажмите на звонок для детального просмотра
                </p>
              </div>
              <RecentCallsTable
                calls={recentCalls}
                isLoading={callsLoading}
                onAnalyzeCall={handleAnalyzeCall}
                onPlayRecording={handlePlayRecording}
              />
            </div>

            {/* AI Инсайты */}
            <div className="xl:col-span-1">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">AI Инсайты</h2>
                <p className="text-muted-foreground text-sm">
                  Рекомендации на основе анализа
                </p>
              </div>
              <AIInsightsPanel
                stats={callStats}
                isLoading={statsLoading}
              />
            </div>
          </div>
        </section>

        {/* Дополнительные секции */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Топ менеджеры */}
            <TopPerformers 
              stats={callStats}
              isLoading={statsLoading}
            />

            {/* Быстрые действия */}
            <QuickActions 
              onActionClick={(action: string) => {
                console.log('Quick action clicked:', action);
                // Здесь можно добавить обработку различных действий
              }}
            />
          </div>
        </section>

        {/* Индикаторы загрузки для действий */}
        {isAnalyzing && (
          <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg z-50">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span className="text-sm">Запуск AI анализа...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
