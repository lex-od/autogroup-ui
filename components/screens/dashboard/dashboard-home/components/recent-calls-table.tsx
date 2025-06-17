'use client';

import { useState } from 'react';
import { Play, Brain, Phone, Clock, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Call } from '@/lib/types';

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
  onPlayRecording 
}: RecentCallsTableProps) => {
  const [selectedCall] = useState<string | null>(null);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Последние звонки</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-3 rounded-lg animate-pulse">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="w-20 h-6 bg-gray-200 rounded"></div>
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

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const getSentimentBadge = (sentiment?: 'positive' | 'negative' | 'neutral') => {
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
      <Phone className="h-4 w-4 text-blue-500 rotate-12" />
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
                className={`flex items-center space-x-4 p-3 rounded-lg border transition-colors hover:bg-muted/50 cursor-pointer ${
                  selectedCall === call.id ? 'bg-muted border-primary' : 'bg-background'
                }`}
                onClick={() => onPlayRecording?.(call.id)}
              >
                {/* Иконка типа звонка */}
                <div className="flex-shrink-0">
                  {getCallTypeIcon(call.type)}
                </div>

                {/* Основная информация */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium truncate">
                      {call.clientName || call.phoneNumber}
                    </p>
                    {getStatusBadge(call.status)}
                    {getSentimentBadge(call.aiAnalysis?.sentiment)}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
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
            <div className="text-center py-8 text-muted-foreground">
              <Phone className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Нет звонков для отображения</p>
            </div>
          )}
        </div>

        {/* Детали выбранного звонка */}
        {selectedCall && calls && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            {(() => {
              const call = calls.find(c => c.id === selectedCall);
              if (!call) return null;

              return (
                <div className="space-y-3">
                  <h4 className="font-medium">Детали звонка</h4>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Номер телефона:</span>
                      <p className="font-medium">{call.phoneNumber}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Тип звонка:</span>
                      <p className="font-medium">
                        {call.type === 'incoming' ? 'Входящий' : 'Исходящий'}
                      </p>
                    </div>
                  </div>

                  {call.aiAnalysis && (
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">AI Анализ</h5>
                      <p className="text-sm text-muted-foreground">
                        {call.aiAnalysis.summary}
                      </p>
                      
                      {call.aiAnalysis.keyTopics.length > 0 && (
                        <div>
                          <span className="text-xs text-muted-foreground">Ключевые темы:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {call.aiAnalysis.keyTopics.map((topic, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentCallsTable; 