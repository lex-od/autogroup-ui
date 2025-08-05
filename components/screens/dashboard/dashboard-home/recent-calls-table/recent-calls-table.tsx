import { Play, Brain, Phone, Clock, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Call } from '@/services/api/queries/calls.queries';

interface RecentCallsTableProps {
  calls?: Call[];
  isLoading?: boolean;
  onAnalyzeCall?: (callId: string) => void;
  onPlayRecording?: (callId: string) => void;
}

const RecentCallsTable = ({
  calls,
  isLoading,
  onAnalyzeCall,
  onPlayRecording,
}: RecentCallsTableProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Последние звонки</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex animate-pulse items-center space-x-4 rounded-lg p-3"
              >
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/4 rounded bg-gray-200"></div>
                  <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                </div>
                <div className="h-6 w-20 rounded bg-gray-200"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: Call['status']) => {
    const variants = {
      completed: 'success',
      missed: 'destructive',
      'in-progress': 'warning',
    } as const;

    const labels = {
      completed: 'Завершен',
      missed: 'Пропущен',
      'in-progress': 'В процессе',
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const getSentimentBadge = (
    sentiment?: 'positive' | 'negative' | 'neutral',
  ) => {
    if (!sentiment) return null;

    const variants = {
      positive: 'success',
      negative: 'destructive',
      neutral: 'warning',
    } as const;

    const labels = {
      positive: 'Позитивный',
      negative: 'Негативный',
      neutral: 'Нейтральный',
    };

    return (
      <Badge variant={variants[sentiment]} className="ml-2">
        {labels[sentiment]}
      </Badge>
    );
  };

  const getCallTypeIcon = (type: Call['type']) => {
    return type === 'incoming' ? (
      <Phone className="h-4 w-4 text-green-500" />
    ) : (
      <Phone className="h-4 w-4 rotate-12 text-blue-500" />
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Phone className="h-5 w-5" />
          <span>Последние звонки</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {calls && calls.length > 0 ? (
            calls.map((call) => (
              <div
                key={call.id}
                className="flex items-center space-x-4 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                onClick={() => onPlayRecording?.(call.id)}
              >
                {/* Иконка типа звонка */}
                <div className="flex-shrink-0">
                  {getCallTypeIcon(call.type)}
                </div>

                {/* Основная информация */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="truncate text-sm font-medium">
                      {call.clientName || call.phoneNumber}
                    </p>
                    {getStatusBadge(call.status)}
                    {getSentimentBadge(call.aiAnalysis?.sentiment)}
                  </div>

                  <div className="mt-1 flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{call.managerName}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDuration(call.duration)}</span>
                    </span>
                    <span>{formatDate(call.date)}</span>
                  </div>
                </div>

                {/* Действия */}
                <div className="flex space-x-2">
                  {call.recordingUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayRecording?.(call.id);
                      }}
                    >
                      <Play className="h-3 w-3" />
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAnalyzeCall?.(call.id);
                    }}
                    disabled={!!call.aiAnalysis}
                  >
                    <Brain className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <Phone className="mx-auto mb-2 h-12 w-12 opacity-50" />
              <p>Нет звонков для отображения</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentCallsTable;
