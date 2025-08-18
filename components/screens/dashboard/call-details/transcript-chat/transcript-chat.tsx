import { FC } from 'react';
import { Brain, Clock, DollarSign, FileText, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CallTranscriptResponse,
  TranscriptSegmentItem,
} from '@/services/api/calls.api';
import { Badge } from '@/components/ui/badge';
import TranscriptChatItem from './transcript-chat-item/transcript-chat-item';

interface Props {
  transcript: CallTranscriptResponse;
  onSegmentPlayClick: (segment: TranscriptSegmentItem) => void;
}

const TranscriptChat: FC<Props> = ({ transcript, onSegmentPlayClick }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <FileText className="size-5" />
            <h2>Транскрипция</h2>
          </div>

          {transcript.overall_confidence && (
            <Badge variant="secondary">
              Точность: {(transcript.overall_confidence * 100).toFixed(0)}%
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="scrollbar-thin max-h-96 space-y-3 overflow-y-auto pr-2">
          {transcript.segments.map((segment) => (
            <TranscriptChatItem
              key={segment.start_ms}
              segment={segment}
              onPlayClick={onSegmentPlayClick}
            />
          ))}
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 border-t pt-4 text-xs text-muted-foreground">
          <p className="flex items-center gap-1">
            <Brain className="size-3" />
            Модель: {transcript.model_used}
          </p>
          <p className="flex items-center gap-1">
            <Clock className="size-3" />
            Время обработки: {transcript.processing_time_ms} мс
          </p>
          <p className="flex items-center gap-1">
            <Zap className="size-3" />
            Токены: 800*
          </p>
          <p className="flex items-center gap-1">
            <DollarSign className="size-3" />
            Стоимость: 0.08* грн
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TranscriptChat;
