import { FC } from 'react';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CallTranscriptResponse,
  TranscriptSegmentItem,
} from '@/services/api/calls.api';
import { formatDuration } from '../call-details.utils';

interface Props {
  transcript?: CallTranscriptResponse;
  transcriptPending: boolean;
  selectedSegmentStart: number | null;
  onSegmentClick: (segment: TranscriptSegmentItem) => void;
}

const TranscriptChat: FC<Props> = ({
  transcript,
  transcriptPending,
  selectedSegmentStart,
  onSegmentClick,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="size-5" />
          <span>Транскрипция</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {!transcriptPending && !transcript && <p>Нет данных</p>}

        {!transcriptPending && transcript && (
          <div className="scrollbar-thin max-h-96 space-y-4 overflow-y-auto pr-2">
            {transcript.segments.map((segment) => (
              <div
                key={segment.start_ms}
                className={cn(
                  'flex cursor-default space-x-3 rounded-lg p-3 transition-colors hover:bg-muted/50',
                  selectedSegmentStart === segment.start_ms &&
                    'border border-primary bg-primary/10',
                )}
                onClick={() => onSegmentClick(segment)}
              >
                <div className="min-w-16 text-xs text-muted-foreground">
                  {formatDuration(segment.start_ms / 1000)}
                </div>
                <div className="grow-1 space-y-1 text-sm">
                  <div className="font-medium">{segment.speaker}</div>
                  <div>{segment.text}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TranscriptChat;
