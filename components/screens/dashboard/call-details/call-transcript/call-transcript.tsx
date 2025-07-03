import { FC } from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CallTranscriptResponse,
  TranscriptSegmentItem,
} from '@/services/api/calls-api';
import { formatDuration } from '../call-details.utils';
import { cn } from '@/lib/utils';

interface Props {
  transcript?: CallTranscriptResponse;
  transcriptPending: boolean;
  selectedSegmentStart: number | null;
  onSegmentClick: (segment: TranscriptSegmentItem) => void;
}

const CallTranscript: FC<Props> = ({
  transcript,
  transcriptPending,
  selectedSegmentStart,
  onSegmentClick,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Транскрипция</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {!transcriptPending && (
          <>
            {!transcript && <p>Нет данных</p>}

            {transcript && (
              <div className="max-h-96 space-y-4 overflow-y-auto">
                {transcript.segments.map((segment) => (
                  <div
                    key={segment.start_ms}
                    className={cn(
                      'cursor-default rounded-lg p-3 transition-colors',
                      selectedSegmentStart === segment.start_ms
                        ? 'border border-primary bg-primary/10'
                        : 'hover:bg-muted/50',
                    )}
                    onClick={() => onSegmentClick(segment)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="min-w-16 text-xs text-muted-foreground">
                        {formatDuration(segment.start_ms / 1000)}
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 text-sm font-medium">
                          {segment.speaker}
                        </div>
                        <div className="text-sm">{segment.text}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CallTranscript;
