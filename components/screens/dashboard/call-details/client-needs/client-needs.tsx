import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CallAnalysisResponse } from '@/services/api/calls.api';
import { AlertTriangle, CheckCircle, User } from 'lucide-react';
import { FC } from 'react';

interface Props {
  analysis: CallAnalysisResponse;
}

const ClientNeeds: FC<Props> = ({ analysis }) => {
  return (
    <Card className="border-purple-200 bg-purple-50 dark:border-border dark:bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Потребности клиента
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <span className="text-sm font-medium text-purple-700 dark:text-card-foreground">
            Потребности:
          </span>
          <div className="mt-1">
            {!analysis.client_needs.length && '—'}

            {!!analysis.client_needs.length && (
              <div className="space-y-1">
                {analysis.client_needs.map((need) => (
                  <div
                    key={need}
                    className="flex items-start gap-2 rounded border border-purple-200 bg-card p-2 dark:border-border"
                  >
                    <CheckCircle className="dark:text-purple-00 mt-0.5 h-3 w-3 flex-shrink-0 text-purple-500" />
                    <span className="text-xs text-purple-700 dark:text-card-foreground">
                      {need}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <span className="text-sm font-medium text-purple-700 dark:text-card-foreground">
            Возражения:
          </span>
          <div className="mt-1">
            {!analysis.client_objections_concerns.length && '—'}

            {!!analysis.client_objections_concerns.length && (
              <div className="space-y-1">
                {analysis.client_objections_concerns.map((objection, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 rounded border border-purple-200 bg-card p-2 dark:border-border"
                  >
                    <AlertTriangle className="mt-0.5 h-3 w-3 flex-shrink-0 text-purple-500 dark:text-purple-400" />
                    <span className="text-xs text-purple-700 dark:text-card-foreground">
                      {objection}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientNeeds;
