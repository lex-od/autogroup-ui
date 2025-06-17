'use client';

import { Award, TrendingUp, Star, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CallStats } from '@/lib/types';

interface TopPerformersProps {
  stats?: CallStats;
  isLoading?: boolean;
}

const TopPerformers = ({ stats, isLoading }: TopPerformersProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 p-3 rounded-lg animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="w-12 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceBadge = (score: number) => {
    if (score >= 0.8) return <Badge variant="success" className="text-xs">Отлично</Badge>;
    if (score >= 0.6) return <Badge variant="warning" className="text-xs">Хорошо</Badge>;
    return <Badge variant="destructive" className="text-xs">Нужно улучшить</Badge>;
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">🥇</div>;
      case 1:
        return <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm font-bold">🥈</div>;
      case 2:
        return <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">🥉</div>;
      default:
        return (
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
            {index + 1}
          </div>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span>Лучшие менеджеры</span>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {stats?.topPerformers && stats.topPerformers.length > 0 ? (
          <div className="space-y-3">
            {stats.topPerformers.slice(0, 5).map((performer, index) => (
              <div 
                key={performer.managerId} 
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-muted/50 ${
                  index === 0 ? 'bg-yellow-50 border border-yellow-200' : 'bg-muted/30'
                }`}
              >
                {/* Место в рейтинге */}
                <div className="flex-shrink-0">
                  {getRankIcon(index)}
                </div>

                {/* Информация о менеджере */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-medium text-sm truncate">
                      {performer.managerName}
                    </p>
                    {index === 0 && <Award className="h-4 w-4 text-yellow-500" />}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Phone className="h-3 w-3" />
                      <span>{performer.callsCount} звонков</span>
                    </span>
                    {getPerformanceBadge(performer.avgSentiment)}
                  </div>
                </div>

                {/* Рейтинг */}
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className={`h-3 w-3 ${getPerformanceColor(performer.avgSentiment)}`} />
                    <p className={`font-medium text-sm ${getPerformanceColor(performer.avgSentiment)}`}>
                      {(performer.avgSentiment * 100).toFixed(1)}%
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">рейтинг</p>
                </div>
              </div>
            ))}

            {/* Статистика по всем менеджерам */}
            <div className="mt-4 pt-4 border-t">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Всего менеджеров</p>
                  <p className="text-lg font-bold text-primary">
                    {stats.topPerformers.length}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Средний рейтинг</p>
                  <p className="text-lg font-bold text-green-600">
                    {(stats.topPerformers.reduce((acc, p) => acc + p.avgSentiment, 0) / stats.topPerformers.length * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Общий объем</p>
                  <p className="text-lg font-bold text-blue-600">
                    {stats.topPerformers.reduce((acc, p) => acc + p.callsCount, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <div className="w-12 h-12 bg-muted rounded-full mx-auto mb-2 flex items-center justify-center">
              📊
            </div>
            <p className="text-sm">Нет данных для отображения</p>
            <p className="text-xs text-muted-foreground mt-1">
              Статистика появится после обработки звонков
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TopPerformers; 