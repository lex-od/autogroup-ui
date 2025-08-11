import { FC, ReactNode, useMemo } from 'react';
import { PhoneIncoming, PhoneOutgoing } from 'lucide-react';
import { VariantProps } from 'class-variance-authority';
import { CallType } from '@/services/api/calls.api';
import { Badge, badgeVariants } from '@/components/ui/badge';

export type CallTypeBadgeProps = {
  callType: CallType;
} & React.ComponentProps<typeof Badge>;

interface BadgeConfig {
  variant: VariantProps<typeof badgeVariants>['variant'];
  icon: ReactNode;
  label: string;
}

const CallTypeBadge: FC<CallTypeBadgeProps> = ({ callType, ...badgeProps }) => {
  const configRecord: Record<CallType, BadgeConfig> = useMemo(() => {
    return {
      incoming: {
        variant: 'tw-green',
        icon: <PhoneIncoming />,
        label: 'Входящий',
      },
      outgoing: {
        variant: 'tw-blue',
        icon: <PhoneOutgoing />,
        label: 'Исходящий',
      },
    };
  }, []);

  const config = configRecord[callType];

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

export default CallTypeBadge;
