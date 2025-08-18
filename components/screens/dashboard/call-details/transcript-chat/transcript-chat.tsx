import { FC } from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CallTranscriptResponse,
  TranscriptSegmentItem,
} from '@/services/api/calls.api';
import { Badge } from '@/components/ui/badge';
import TranscriptChatItem from './transcript-chat-item/transcript-chat-item';

interface Props {
  transcript?: CallTranscriptResponse;
  transcriptPending: boolean;
  onSegmentPlayClick: (segment: TranscriptSegmentItem) => void;
}

const TranscriptChat: FC<Props> = ({
  transcript,
  transcriptPending,
  onSegmentPlayClick,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <FileText className="size-5" />
            <h2>Транскрипция</h2>
          </div>

          {transcript?.overall_confidence && (
            <Badge variant="secondary">
              Точность: {(transcript.overall_confidence * 100).toFixed(0)}%
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {!transcriptPending && !transcript && (
          <div className="space-y-2 py-4 text-muted-foreground">
            <FileText className="mx-auto size-8" />
            <p className="text-center">Нет транскрипции</p>
          </div>
        )}

        {transcript && (
          <div className="space-y-4">
            <div className="scrollbar-thin max-h-96 space-y-3 overflow-y-auto pr-2">
              {transcript.segments.map((segment) => (
                <TranscriptChatItem
                  key={segment.start_ms}
                  segment={segment}
                  onPlayClick={onSegmentPlayClick}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TranscriptChat;
