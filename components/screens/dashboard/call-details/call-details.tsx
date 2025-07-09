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
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TranscriptSegmentItem,
  useCallAnalysisQuery,
  useCallDetailsQuery,
  useCallTranscriptQuery,
} from '@/services/api/calls-api';
import { getPublicUrl } from '@/lib/supabase';
import { formatDuration } from './call-details.utils';
import CallTranscript from './call-transcript/call-transcript';
import AiAnalysis from './ai-analysis/ai-analysis';

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
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      {/* Хедер */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
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
        {details.storage_path && (
          <Button variant="outline" className="cursor-default" asChild>
            <a
              href={getPublicUrl('call-recordings', details.storage_path, {
                download: true,
              })}
            >
              <Download />
              <span>Скачать запись</span>
            </a>
          </Button>
        )}
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
          <AiAnalysis analysis={analysis} analysisPending={analysisPending} />

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
