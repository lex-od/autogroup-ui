import { Award, TrendingUp, Star, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CallStats } from '@/services/api/queries/calls.queries';

interface TopPerformersProps {
  stats?: CallStats;
  isLoading?: boolean;
}

const TopPerformers = ({ stats, isLoading }: TopPerformersProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex animate-pulse items-center space-x-3 rounded-lg p-3"
              >
                <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                  <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                </div>
                <div className="h-4 w-12 rounded bg-gray-200"></div>
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
    if (score >= 0.8)
      return (
        <Badge variant="success" className="text-xs">
          Отлично
        </Badge>
      );
    if (score >= 0.6)
      return (
        <Badge variant="warning" className="text-xs">
          Хорошо
        </Badge>
      );
    return (
      <Badge variant="destructive" className="text-xs">
        Нужно улучшить
      </Badge>
    );
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-sm font-bold text-white">
            🥇
          </div>
        );
      case 1:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-sm font-bold text-white">
            🥈
          </div>
        );
      case 2:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">
            🥉
          </div>
        );
      default:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            {index + 1}
          </div>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-primary"></div>
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
                className="flex items-center space-x-3 rounded-lg bg-muted/30 p-3 transition-colors hover:bg-muted/50"
              >
                {/* Место в рейтинге */}
                <div className="flex-shrink-0">{getRankIcon(index)}</div>

                {/* Информация о менеджере */}
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center space-x-2">
                    <p className="truncate text-sm font-medium">
                      {performer.managerName}
                    </p>
                    {index === 0 && (
                      <Award className="h-4 w-4 text-yellow-500" />
                    )}
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
                <div className="flex-shrink-0 text-right">
                  <div className="mb-1 flex items-center space-x-1">
                    <Star
                      className={`h-3 w-3 ${getPerformanceColor(performer.avgSentiment)}`}
                    />
                    <p
                      className={`text-sm font-medium ${getPerformanceColor(performer.avgSentiment)}`}
                    >
                      {(performer.avgSentiment * 100).toFixed(1)}%
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">рейтинг</p>
                </div>
              </div>
            ))}

            {/* Статистика по всем менеджерам */}
            <div className="mt-4 border-t pt-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    Всего менеджеров
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {stats.topPerformers.length}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    Средний рейтинг
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    {(
                      (stats.topPerformers.reduce(
                        (acc, p) => acc + p.avgSentiment,
                        0,
                      ) /
                        stats.topPerformers.length) *
                      100
                    ).toFixed(1)}
                    %
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Общий объем</p>
                  <p className="text-lg font-bold text-blue-600">
                    {stats.topPerformers.reduce(
                      (acc, p) => acc + p.callsCount,
                      0,
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              📊
            </div>
            <p className="text-sm">Нет данных для отображения</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Статистика появится после обработки звонков
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TopPerformers;
