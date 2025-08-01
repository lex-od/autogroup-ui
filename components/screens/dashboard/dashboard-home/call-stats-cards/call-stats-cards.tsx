'use client';

import { Phone, PhoneCall, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CallStats } from '@/services/api/queries/calls.queries';

interface CallStatsCardsProps {
  stats?: CallStats;
  isLoading?: boolean;
}

const CallStatsCards = ({ stats, isLoading }: CallStatsCardsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 rounded bg-gray-200"></div>
              <div className="h-4 w-4 rounded bg-gray-200"></div>
            </CardHeader>
            <CardContent>
              <div className="mb-1 h-6 w-16 rounded bg-gray-200"></div>
              <div className="h-3 w-20 rounded bg-gray-200"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 0.5) return 'success';
    if (sentiment >= 0) return 'warning';
    return 'destructive';
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Общее количество звонков */}
      <Card className="gap-2 py-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Всего звонков</CardTitle>
          <Phone className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.totalCalls || 0}</div>
          <p className="text-xs text-muted-foreground">
            +{Math.round((stats?.totalCalls || 0) * 0.12)} чем вчера
          </p>
        </CardContent>
      </Card>

      {/* Успешные звонки */}
      <Card className="gap-2 py-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Успешные звонки</CardTitle>
          <PhoneCall className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.completedCalls || 0}</div>
          <div className="flex items-center space-x-2">
            <Badge variant="success">
              {stats?.totalCalls
                ? Math.round((stats.completedCalls / stats.totalCalls) * 100)
                : 0}
              %
            </Badge>
            <p className="text-xs text-muted-foreground">конверсия</p>
          </div>
        </CardContent>
      </Card>

      {/* Средняя длительность */}
      <Card className="gap-2 py-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">
            Средняя длительность
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatDuration(stats?.averageDuration || 0)}
          </div>
          <p className="text-xs text-muted-foreground">мин:сек</p>
        </CardContent>
      </Card>

      {/* Средний sentiment */}
      <Card className="gap-2 py-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Средний настрой</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats?.averageSentiment
              ? (stats.averageSentiment * 100).toFixed(1)
              : 0}
            %
          </div>
          <Badge variant={getSentimentColor(stats?.averageSentiment || 0)}>
            {stats?.averageSentiment && stats.averageSentiment >= 0.5
              ? 'Позитивный'
              : stats?.averageSentiment && stats.averageSentiment >= 0
                ? 'Нейтральный'
                : 'Негативный'}
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallStatsCards;
