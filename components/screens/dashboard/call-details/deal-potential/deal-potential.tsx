import { FC } from 'react';
import {
  CallAnalysisResponse,
  ClientReadiness,
} from '@/services/api/calls.api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { VariantProps } from 'class-variance-authority';

interface Props {
  analysis: CallAnalysisResponse;
}
type ClientReadinessBadgeVariants = Record<
  ClientReadiness | 'default',
  VariantProps<typeof badgeVariants>['variant']
>;

const DealPotential: FC<Props> = ({ analysis }) => {
  const clientReadinessBadge = (() => {
    const variants: ClientReadinessBadgeVariants = {
      высокая: 'tw-green',
      средняя: 'tw-yellow',
      низкая: 'tw-red',
      default: 'tw-gray',
    };
    if (!analysis.client_readiness) {
      return '—';
    }
    return (
      <Badge
        variant={variants[analysis.client_readiness] || variants.default}
        className="capitalize"
      >
        {analysis.client_readiness}
      </Badge>
    );
  })();

  const followUpPriorityBadge = (() => {
    const variants = {
      высокий: 'tw-green' as const,
      средний: 'tw-yellow' as const,
      низкий: 'tw-red' as const,
      default: 'tw-gray' as const,
    };
    if (!analysis.follow_up_priority) {
      return '—';
    }
    return (
      <Badge
        variant={variants[analysis.follow_up_priority] || variants.default}
        className="capitalize"
      >
        {analysis.follow_up_priority}
      </Badge>
    );
  })();

  return (
    <Card className="border-blue-200 bg-blue-50 dark:border-blue-950 dark:bg-blue-950/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Потенциал сделки
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Готовность клиента:
            </span>
            {clientReadinessBadge}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Размер сделки:
            </span>
            <Badge variant="secondary" className="capitalize">
              {analysis.expected_deal_size || '—'}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Приоритет связи:
            </span>
            {followUpPriorityBadge}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealPotential;
