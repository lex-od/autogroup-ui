'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Download, ArrowLeft, Clock, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  TranscriptSegmentItem,
  useCallAnalysisQuery,
  useCallDetailsQuery,
  useCallTranscriptQuery,
} from '@/services/api/calls.api';
import { getPublicUrl } from '@/lib/supabase';
import { formatDuration } from './call-details.utils';
import CallTranscript from './call-transcript/call-transcript';
import AiAnalysis from './ai-analysis/ai-analysis';
import AudioPlayer, { AudioPlayerHandle } from './audio-player/audio-player';
import CallComments from './call-comments/call-comments';

interface CallDetailsProps {
  callId: string;
}

const CallDetails = ({ callId }: CallDetailsProps) => {
  const [selectedSegmentStart, setSelectedSegmentStart] = useState<
    number | null
  >(null);

  const playerRef = useRef<AudioPlayerHandle>(null);

  const { data: details, isPending: detailsPending } =
    useCallDetailsQuery(callId);
  const { data: transcript, isPending: transcriptPending } =
    useCallTranscriptQuery(callId);
  const { data: analysis, isPending: analysisPending } =
    useCallAnalysisQuery(callId);

  const handleSegmentClick = (segment: TranscriptSegmentItem) => {
    setSelectedSegmentStart(segment.start_ms);
    playerRef.current?.seek(segment.start_ms / 1000);
    playerRef.current?.play();
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
        <Button variant="outline" className="cursor-default" asChild>
          <a
            href={getPublicUrl('call-recordings', details.storage_path, {
              download: true,
            })}
          >
            <Download />
            Скачать запись
          </a>
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
          <AudioPlayer
            src={getPublicUrl('call-recordings', details.storage_path)}
            ref={playerRef}
          />

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
          <CallComments callId={callId} />
        </div>
      </div>
    </div>
  );
};

export default CallDetails;
