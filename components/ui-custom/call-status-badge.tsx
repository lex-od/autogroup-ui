import { FC, ReactNode, useMemo } from 'react';
import { VariantProps } from 'class-variance-authority';
import {
  Brain,
  CheckCircle,
  FileText,
  LoaderCircle,
  Upload,
  XCircle,
} from 'lucide-react';
import { CallStatus } from '@/services/api/calls.api';
import { Badge, badgeVariants } from '@/components/ui/badge';

export type CallStatusBadgeProps = {
  status: CallStatus;
} & React.ComponentProps<typeof Badge>;

interface BadgeConfig {
  variant: VariantProps<typeof badgeVariants>['variant'];
  icon: ReactNode;
  label: string;
}

const CallStatusBadge: FC<CallStatusBadgeProps> = ({
  status,
  ...badgeProps
}) => {
  const configRecord = useMemo((): Record<CallStatus, BadgeConfig> => {
    return {
      uploaded: {
        variant: 'tw-blue',
        icon: <Upload />,
        label: 'Загружен',
      },
      processing: {
        variant: 'tw-cyan',
        icon: <LoaderCircle className="animate-spin" />,
        label: 'Обработка',
      },
      transcribing: {
        variant: 'tw-yellow',
        icon: <FileText />,
        label: 'Транскрибация',
      },
      analyzing: {
        variant: 'tw-purple',
        icon: <Brain />,
        label: 'Анализ',
      },
      completed: {
        variant: 'tw-indigo',
        icon: <CheckCircle />,
        label: 'Завершен',
      },
      failed: {
        variant: 'tw-red',
        icon: <XCircle />,
        label: 'Ошибка',
      },
    };
  }, []);

  const config = configRecord[status];

  if (!config) {
    return null;
  }
  return (
    <Badge variant={config.variant} {...badgeProps}>
      {config.icon}
      <span>{config.label}</span>
    </Badge>
  );
};

export default CallStatusBadge;
