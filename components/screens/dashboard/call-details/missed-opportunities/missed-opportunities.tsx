import { FC } from 'react';
import { CallAnalysisResponse } from '@/services/api/calls.api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface Props {
  analysis: CallAnalysisResponse;
}

const MissedOpportunities: FC<Props> = ({ analysis }) => {
  return (
    <Card className="border-orange-200 bg-orange-50 dark:border-border dark:bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="size-5" />
          Упущенные возможности
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {analysis.missed_opportunities.map((item) => (
          <div
            key={item}
            className="flex items-start gap-2 rounded border border-orange-200 bg-card p-2 dark:border-border"
          >
            <AlertTriangle className="mt-0.5 h-3 w-3 flex-shrink-0 text-orange-500 dark:text-orange-400" />
            <span className="text-xs text-orange-700 dark:text-card-foreground">
              {item}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MissedOpportunities;
