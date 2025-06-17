'use client';

import { Brain, TrendingUp, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CallStats } from '@/lib/types';

interface AIInsightsPanelProps {
  stats?: CallStats;
  isLoading?: boolean;
}

const AIInsightsPanel = ({ stats, isLoading }: AIInsightsPanelProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI Инсайты</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Генерируем инсайты на основе статистики
  const generateInsights = () => {
    const insights = [];

    if (stats) {
      // Анализ конверсии
      const conversionRate = stats.totalCalls > 0 ? (stats.completedCalls / stats.totalCalls) * 100 : 0;
      
      if (conversionRate < 70) {
        insights.push({
          type: 'warning' as const,
          title: 'Низкая конверсия звонков',
          description: `Только ${conversionRate.toFixed(1)}% звонков завершены успешно. Рекомендуется проанализировать причины пропусков.`,
          action: 'Проанализировать пропущенные звонки',
        });
      } else if (conversionRate > 85) {
        insights.push({
          type: 'success' as const,
          title: 'Отличная конверсия',
          description: `${conversionRate.toFixed(1)}% звонков завершены успешно - это отличный результат!`,
          action: 'Поделиться лучшими практиками',
        });
      }

      // Анализ настроения
      if (stats.averageSentiment < 0.3) {
        insights.push({
          type: 'error' as const,
          title: 'Негативное настроение клиентов',
          description: 'Средний sentiment ниже нормы. Возможно, есть проблемы с качеством обслуживания.',
          action: 'Провести дополнительное обучение менеджеров',
        });
      } else if (stats.averageSentiment > 0.7) {
        insights.push({
          type: 'success' as const,
          title: 'Позитивные отзывы клиентов',
          description: 'Клиенты довольны качеством обслуживания. Хорошая работа команды!',
          action: 'Мотивировать команду',
        });
      }

      // Анализ длительности звонков
      if (stats.averageDuration < 120) {
        insights.push({
          type: 'info' as const,
          title: 'Короткие звонки',
          description: 'Средняя длительность звонков менее 2 минут. Возможно, клиенты быстро принимают решения.',
          action: 'Изучить эффективность скриптов',
        });
      } else if (stats.averageDuration > 600) {
        insights.push({
          type: 'warning' as const,
          title: 'Длинные переговоры',
          description: 'Звонки длятся более 10 минут в среднем. Стоит оптимизировать процесс продаж.',
          action: 'Пересмотреть скрипты продаж',
        });
      }

      // Топ-исполнители
      if (stats.topPerformers.length > 0) {
        const bestPerformer = stats.topPerformers[0];
        insights.push({
          type: 'info' as const,
          title: 'Лучший менеджер месяца',
          description: `${bestPerformer.managerName} показывает лучшие результаты с ${bestPerformer.callsCount} звонками.`,
          action: 'Изучить подход лучшего менеджера',
        });
      }
    }

    // Общие рекомендации, если нет специфичных инсайтов
    if (insights.length === 0) {
      insights.push({
        type: 'info' as const,
        title: 'Стабильная работа',
        description: 'Все показатели в норме. Продолжайте в том же духе!',
        action: 'Поддерживать текущий уровень',
      });
    }

    return insights.slice(0, 4); // Ограничиваем до 4 инсайтов
  };

  const insights = generateInsights();

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Lightbulb className="h-4 w-4 text-blue-500" />;
    }
  };

  const getInsightBadge = (type: string) => {
    const variants = {
      success: 'success' as const,
      warning: 'warning' as const,
      error: 'destructive' as const,
      info: 'info' as const,
    };

    return variants[type as keyof typeof variants] || 'default';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5" />
          <span>AI Инсайты и рекомендации</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-muted bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getInsightIcon(insight.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-sm font-medium">{insight.title}</h4>
                    <Badge variant={getInsightBadge(insight.type)} className="text-xs">
                      {insight.type === 'success' && 'Отлично'}
                      {insight.type === 'warning' && 'Внимание'}
                      {insight.type === 'error' && 'Проблема'}
                      {insight.type === 'info' && 'Инфо'}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {insight.description}
                  </p>
                  
                  <div className="flex items-center space-x-1 text-xs text-primary">
                    <TrendingUp className="h-3 w-3" />
                    <span>{insight.action}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Общие метрики производительности */}
        {stats && (
          <div className="mt-6 p-4 bg-primary/5 rounded-lg">
            <h4 className="text-sm font-medium mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Ключевые метрики
            </h4>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Конверсия:</span>
                <p className="font-medium">
                  {stats.totalCalls > 0 ? ((stats.completedCalls / stats.totalCalls) * 100).toFixed(1) : 0}%
                </p>
              </div>
              
              <div>
                <span className="text-muted-foreground">Удовлетворенность:</span>
                <p className="font-medium">
                  {stats.averageSentiment ? (stats.averageSentiment * 100).toFixed(0) : 0}%
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsightsPanel; 