import { FC } from 'react';
import { VariantProps } from 'class-variance-authority';
import { CheckCircle, Target, User } from 'lucide-react';
import { Badge, badgeVariants } from '@/components/ui/badge';

type Priority = 'high' | 'medium' | 'low';

interface Props {
  title: string;
  priority: Priority;
  isCompleted: boolean;
}
interface PriorityBadgeConfig {
  variant: VariantProps<typeof badgeVariants>['variant'];
  label: string;
}

const AiAnalysisActionItem: FC<Props> = ({ title, priority, isCompleted }) => {
  const getPriorityBadge = () => {
    const configRecord: Record<Priority, PriorityBadgeConfig> = {
      high: {
        variant: 'tw-red',
        label: 'Высокий',
      },
      medium: {
        variant: 'tw-yellow',
        label: 'Средний',
      },
      low: {
        variant: 'tw-green',
        label: 'Низкий',
      },
    };
    const config = configRecord[priority];

    if (!config) {
      return null;
    }
    return <Badge variant={config.variant}>{config.label} *</Badge>;
  };

  return (
    <div className="flex gap-3 rounded-lg border p-3">
      <Target className="mt-0.5 size-4 flex-shrink-0 text-blue-500 dark:text-blue-400" />

      <div className="grow-1 space-y-2">
        <div className="flex justify-between gap-2">
          <p className="text-sm">{title}</p>
          {isCompleted && (
            <CheckCircle className="mt-0.5 size-4 flex-shrink-0 text-green-500 dark:text-green-400" />
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {getPriorityBadge()}

          <Badge variant="outline">
            <User />
            <span>Менеджер *</span>
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default AiAnalysisActionItem;
