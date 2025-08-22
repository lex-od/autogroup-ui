import { FC } from 'react';
import { Award, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CallAnalysisResponse } from '@/services/api/calls.api';

interface Props {
  analysis: CallAnalysisResponse;
}

const ManagerStrengths: FC<Props> = ({ analysis }) => {
  return (
    <Card className="border-green-200 bg-green-50 dark:border-border dark:bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="size-5" />
          Сильные стороны
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {analysis.manager_strengths.map((item) => (
          <div
            key={item}
            className="flex items-start gap-2 rounded border border-green-200 bg-card p-2 dark:border-border"
          >
            <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-500 dark:text-green-400" />
            <span className="text-xs text-green-700 dark:text-card-foreground">
              {item}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ManagerStrengths;
