'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Download,
  ArrowLeft,
  Clock,
  User,
  Phone,
  Brain,
  MessageSquare,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCallAIAnalysis } from '@/services/api/queries/calls.queries';
import {
  TranscriptSegmentItem,
  useCallAnalysisQuery,
  useCallDetailsQuery,
  useCallTranscriptQuery,
} from '@/services/api/calls-api';
import { formatDuration } from './call-details.utils';
import CallTranscript from './call-transcript/call-transcript';

interface CallDetailsProps {
  callId: string;
}

const CallDetails = ({ callId }: CallDetailsProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedSegmentStart, setSelectedSegmentStart] = useState<
    number | null
  >(null);

  const audioRef = useRef<HTMLAudioElement>(null);

  const { data: details, isPending: detailsPending } =
    useCallDetailsQuery(callId);
  const { data: transcript, isPending: transcriptPending } =
    useCallTranscriptQuery(callId);
  const { data: analysis, isPending: analysisPending } =
    useCallAnalysisQuery(callId);

  // Получаем данные звонка и AI анализ
  const { data: aiAnalysis } = useCallAIAnalysis(callId);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setCurrentTime(time);
  };

  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    seek(newTime);
  };

  const handleSegmentClick = (segment: TranscriptSegmentItem) => {
    setSelectedSegmentStart(segment.start_ms);
    seek(segment.start_ms / 1000);
  };

  const getSentimentBadge = (sentiment: string) => {
    const variants = {
      positive: 'success' as const,
      negative: 'destructive' as const,
      neutral: 'warning' as const,
    };
    const labels = {
      positive: 'Позитивный',
      negative: 'Негативный',
      neutral: 'Нейтральный',
    };
    return (
      <Badge variant={variants[sentiment as keyof typeof variants]}>
        {labels[sentiment as keyof typeof labels]}
      </Badge>
    );
  };

  if (detailsPending) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse">
          <div className="mb-6 h-8 w-48 rounded bg-gray-200"></div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="h-32 rounded bg-gray-200"></div>
              <div className="h-96 rounded bg-gray-200"></div>
            </div>
            <div className="h-96 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }
  if (!details) {
    return null;
  }
  return (
    <div className="container mx-auto max-w-7xl space-y-6 p-6">
      {/* Хедер */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/calls" className="cursor-default space-x-1">
              <ArrowLeft className="h-4 w-4" />
              <span>Назад к звонкам</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              Звонок {details.client_name || details.phone_number}
            </h1>
            <p className="text-muted-foreground">
              {new Date(details.created_at).toLocaleString('ru-RU')}
            </p>
          </div>
        </div>
        <Button variant="outline" className="flex items-center space-x-1">
          <Download className="h-4 w-4" />
          <span>Скачать запись</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Основной контент */}
        <div className="space-y-6 lg:col-span-2">
          {/* Информация о звонке */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Номер телефона
                    </p>
                    <p className="font-medium">
                      {details.phone_number || 'Нет номера'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Клиент</p>
                    <p className="font-medium">
                      {details.client_name || 'Нет названия'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Менеджер</p>
                    <p className="font-medium">
                      {details.manager_name || 'Нет имени'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Длительность
                    </p>
                    <p className="font-medium">
                      {details.duration_seconds
                        ? formatDuration(details.duration_seconds)
                        : 'Нет данных'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Аудиоплеер */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Volume2 className="h-5 w-5" />
                <span>Запись разговора</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <audio
                ref={audioRef}
                // src="/recordings/call-sample.mp3"
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />

              {/* Прогресс бар */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatDuration(currentTime)}</span>
                  <span>{formatDuration(duration)}</span>
                </div>
                <div
                  className="h-2 w-full cursor-pointer rounded-full bg-gray-200"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percent = (e.clientX - rect.left) / rect.width;
                    seek(percent * duration);
                  }}
                >
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
              </div>

              {/* Контролы */}
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => skipTime(-10)}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>

                <Button
                  size="lg"
                  onClick={togglePlayPause}
                  className="h-12 w-12 rounded-full"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => skipTime(10)}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              {/* Скорость воспроизведения */}
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm">Скорость:</span>
                {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
                  <Button
                    key={rate}
                    variant={playbackRate === rate ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setPlaybackRate(rate);
                      if (audioRef.current) {
                        audioRef.current.playbackRate = rate;
                      }
                    }}
                  >
                    {rate}x
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Транскрипция */}
          <CallTranscript
            transcript={transcript}
            transcriptPending={transcriptPending}
            selectedSegmentStart={selectedSegmentStart}
            onSegmentClick={handleSegmentClick}
          />
        </div>

        {/* Боковая панель с AI анализом */}
        <div className="space-y-6">
          {/* AI Анализ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>AI Анализ</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiAnalysis ? (
                <>
                  {/* Настроение */}
                  <div>
                    <p className="mb-2 text-sm font-medium">Настроение</p>
                    <div className="flex items-center justify-between">
                      {getSentimentBadge(aiAnalysis.sentiment)}
                      <span className="text-sm text-muted-foreground">
                        {(aiAnalysis.sentimentScore * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  {/* Качество лида */}
                  <div>
                    <p className="mb-2 text-sm font-medium">Качество лида</p>
                    <Badge
                      variant={
                        aiAnalysis.leadQuality === 'hot'
                          ? 'destructive'
                          : aiAnalysis.leadQuality === 'warm'
                            ? 'warning'
                            : 'secondary'
                      }
                    >
                      {aiAnalysis.leadQuality === 'hot'
                        ? 'Горячий'
                        : aiAnalysis.leadQuality === 'warm'
                          ? 'Теплый'
                          : 'Холодный'}
                    </Badge>
                  </div>

                  {/* Оценка удовлетворенности */}
                  <div>
                    <p className="mb-2 text-sm font-medium">
                      Удовлетворенность
                    </p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < aiAnalysis.satisfaction
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {aiAnalysis.satisfaction}/5
                      </span>
                    </div>
                  </div>

                  {/* Ключевые темы */}
                  <div>
                    <p className="mb-2 text-sm font-medium">Ключевые темы</p>
                    <div className="flex flex-wrap gap-1">
                      {aiAnalysis.keyTopics.map((topic, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Резюме */}
                  <div>
                    <p className="mb-2 text-sm font-medium">Резюме</p>
                    <p className="text-sm text-muted-foreground">
                      {aiAnalysis.summary}
                    </p>
                  </div>

                  {/* Действия */}
                  <div>
                    <p className="mb-2 text-sm font-medium">
                      Рекомендуемые действия
                    </p>
                    <ul className="space-y-1">
                      {aiAnalysis.actionItems.map((action, index) => (
                        <li
                          key={index}
                          className="flex items-start space-x-2 text-sm text-muted-foreground"
                        >
                          <span className="text-primary">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="py-4 text-center">
                  <Brain className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">AI анализ недоступен</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Заметки */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Заметки</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                className="h-32 w-full resize-none rounded-md border p-3 text-sm"
                placeholder="Добавьте заметки к этому звонку..."
              />
              <Button className="mt-3 w-full" size="sm">
                Сохранить заметки
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CallDetails;
