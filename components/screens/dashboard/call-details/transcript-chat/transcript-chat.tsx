import { FC } from 'react';
import { FileText, Play } from 'lucide-react';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CallTranscriptResponse,
  TranscriptSegmentItem,
} from '@/services/api/calls.api';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDuration } from '../call-details.utils';

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
  const getSpeakerBadgeVariant = (speaker: string) => {
    const variantRec: Record<
      string,
      VariantProps<typeof badgeVariants>['variant']
    > = {
      A: 'tw-blue',
      B: 'tw-green',
      default: 'tw-gray',
    };
    return variantRec[speaker] || variantRec.default;
  };

  const getMessageColors = (speaker: string) => {
    const colorRec: Record<string, string> = {
      A: 'border border-blue-200 bg-blue-50 dark:border-blue-950 dark:bg-blue-950/50',
      B: 'border border-green-200 bg-green-50 dark:border-green-950 dark:bg-green-950/50',
      default:
        'border border-gray-200 bg-gray-50 dark:border-gray-950 dark:bg-gray-950/50',
    };
    return colorRec[speaker] || colorRec.default;
  };

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
                <div key={segment.start_ms} className="space-y-1">
                  {/* Header */}
                  <div className="flex items-center gap-2">
                    <Badge variant={getSpeakerBadgeVariant(segment.speaker)}>
                      {segment.name || segment.role || segment.speaker}
                    </Badge>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="group relative h-6 !px-2 text-xs text-muted-foreground transition-all duration-300"
                      onClick={() => onSegmentPlayClick(segment)}
                    >
                      <Play className="absolute inset-0 m-auto size-3 opacity-0 group-hover:opacity-100" />
                      <span className="group-hover:opacity-0">
                        {formatDuration(segment.start_ms / 1000)}
                      </span>
                    </Button>
                  </div>

                  {/* Message */}
                  <p
                    className={cn(
                      'inline-block rounded-lg p-3 text-sm leading-relaxed',
                      getMessageColors(segment.speaker),
                    )}
                  >
                    {segment.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TranscriptChat;
