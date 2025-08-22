import { FC } from 'react';
import { Play } from 'lucide-react';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { TranscriptSegmentItem } from '@/services/api/calls.api';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDuration } from '../../call-details.utils';

interface Props {
  segment: TranscriptSegmentItem;
  onPlayClick: (segment: TranscriptSegmentItem) => void;
}

const TranscriptChatItem: FC<Props> = ({ segment, onPlayClick }) => {
  const isLeft = segment.speaker === 'A';

  const speakerBadgeVariant = (() => {
    const variantRec: Record<
      string,
      VariantProps<typeof badgeVariants>['variant']
    > = {
      A: 'tw-blue',
      B: 'tw-green',
      default: 'tw-gray',
    };
    return variantRec[segment.speaker] || variantRec.default;
  })();

  const messageColors = (() => {
    const colorRec: Record<string, string> = {
      A: 'border border-blue-200 bg-blue-50 dark:border-blue-950 dark:bg-blue-950/50',
      B: 'border border-green-200 bg-green-50 dark:border-green-950 dark:bg-green-950/50',
      default:
        'border border-gray-200 bg-gray-50 dark:border-gray-950 dark:bg-gray-950/50',
    };
    return colorRec[segment.speaker] || colorRec.default;
  })();

  return (
    <div
      className={cn(
        'flex flex-col gap-1',
        isLeft ? 'items-start' : 'items-end',
      )}
    >
      {/* Header */}
      <div
        className={cn('flex items-center gap-2', {
          'flex-row-reverse': !isLeft,
        })}
      >
        <Badge variant={speakerBadgeVariant}>
          {segment.name || segment.role || segment.speaker}
        </Badge>

        <Button
          variant="ghost"
          size="sm"
          className="group relative h-6 !px-2 text-xs text-muted-foreground transition-all duration-300"
          onClick={() => onPlayClick(segment)}
        >
          <Play className="absolute inset-0 m-auto size-3 opacity-0 group-hover:opacity-100" />
          <span className="group-hover:opacity-0">
            {formatDuration(segment.start_ms / 1000)}
          </span>
        </Button>
      </div>

      {/* Message */}
      <p
        className={cn('rounded-lg p-3 text-sm leading-relaxed', messageColors)}
      >
        {segment.text}
      </p>
    </div>
  );
};

export default TranscriptChatItem;
