'use client';

import { useRouter } from 'next/navigation';
import {
  useCallStats,
  useRecentCalls,
  useStartAIAnalysis,
} from '@/services/api/queries/calls.queries';

// Импорт компонентов (убираем DashboardHeader)
import CallStatsCards from './call-stats-cards/call-stats-cards';
import RecentCallsTable from './recent-calls-table/recent-calls-table';
import AIInsightsPanel from './ai-insights-panel/ai-insights-panel';
import AnalyticsCharts from './analytics-charts/analytics-charts';
import TopPerformers from './top-performers/top-performers';
import QuickActions from './quick-actions/quick-actions';

const DashboardHome = () => {
  const router = useRouter();
  // Фильтры для будущего использования
  // const [filters] = useState({});

  // React Query хуки
  const { data: callStats, isLoading: statsLoading } = useCallStats();
  const { data: recentCalls, isLoading: callsLoading } = useRecentCalls(10);
  const { mutate: startAIAnalysis, isPending: isAnalyzing } =
    useStartAIAnalysis();

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
    <div className="h-full w-full">
      <div className="mx-auto max-w-7xl space-y-6 p-4 lg:p-6">
        {/* Основные метрики */}
        <section>
          <CallStatsCards stats={callStats} isLoading={statsLoading} />
        </section>

        {/* Графики аналитики */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Аналитика</h2>
            <p className="text-sm text-muted-foreground">
              Подробные графики и тренды по звонкам
            </p>
          </div>
          <AnalyticsCharts stats={callStats} isLoading={statsLoading} />
        </section>

        {/* Основной контент */}
        <section>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Последние звонки */}
            <div className="xl:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Последние звонки</h2>
                <p className="text-sm text-muted-foreground">
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
                <p className="text-sm text-muted-foreground">
                  Рекомендации на основе анализа
                </p>
              </div>
              <AIInsightsPanel stats={callStats} isLoading={statsLoading} />
            </div>
          </div>
        </section>

        {/* Дополнительные секции */}
        <section>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Топ менеджеры */}
            <TopPerformers stats={callStats} isLoading={statsLoading} />

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
          <div className="fixed right-4 bottom-4 z-50 rounded-lg bg-primary p-4 text-primary-foreground shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
              <span className="text-sm">Запуск AI анализа...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
