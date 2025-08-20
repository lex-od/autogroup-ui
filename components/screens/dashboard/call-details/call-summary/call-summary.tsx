import { FC } from 'react';
import { FileText, Clock, User, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CallAnalysisResponse } from '@/services/api/calls.api';

interface Props {
  analysis: CallAnalysisResponse;
}

const CallSummary: FC<Props> = ({ analysis }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="size-5" />
          Резюме звонка
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {analysis.summary}
        </p>

        <div className="grid gap-4 border-t pt-4 md:grid-cols-2">
          <div className="flex gap-2">
            <Target className="size-4 text-muted-foreground" />
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Цель звонка
              </p>
              <p className="text-sm">{analysis.call_purpose || '—'}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Clock className="size-4 text-muted-foreground" />
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Результат
              </p>
              <p className="text-sm">
                {analysis.call_outcome.specific_outcome_details || '—'}
              </p>
            </div>
          </div>
        </div>

        {!!analysis.participants_roles.length && (
          <div className="flex gap-2 border-t pt-4">
            <User className="size-4 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                Участники
              </p>
              <div className="flex flex-wrap gap-2">
                {analysis.participants_roles.map(
                  ({ name, role_detail, speaker_type }) => (
                    <Badge
                      key={`${name}${role_detail}${speaker_type}`}
                      variant="outline"
                    >
                      {speaker_type}
                      {name ? `: ${name}` : ''}
                    </Badge>
                  ),
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CallSummary;
