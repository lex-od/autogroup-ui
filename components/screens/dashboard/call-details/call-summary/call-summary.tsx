import { FC } from 'react';
import { FileText, Clock, User, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CallAnalysisResponse,
  CallDetailsResponse,
} from '@/services/api/calls.api';

interface Props {
  analysis?: CallAnalysisResponse;
  analysisPending: boolean;
  call: CallDetailsResponse;
}

const CallSummary: FC<Props> = ({ analysis, analysisPending, call }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="size-5" />
          Резюме звонка
        </CardTitle>
      </CardHeader>

      <CardContent>
        {!analysisPending && !analysis && (
          <div className="space-y-2 py-4 text-muted-foreground">
            <FileText className="mx-auto size-8" />
            <p className="text-center">Нет данных</p>
          </div>
        )}

        {analysis && (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {analysis.summary}
            </p>

            <div className="grid gap-4 border-t pt-4 md:grid-cols-2">
              <div className="flex gap-2">
                <Target className="mt-0.5 size-4 text-muted-foreground" />
                <div>
                  <span className="text-xs font-medium text-muted-foreground">
                    Цель звонка *
                  </span>
                  <p className="text-sm">Консультация</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Clock className="mt-0.5 size-4 text-muted-foreground" />
                <div>
                  <span className="text-xs font-medium text-muted-foreground">
                    Результат *
                  </span>
                  <p className="text-sm">Консультация завершена успешно</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex gap-2">
                <User className="mt-0.5 size-4 text-muted-foreground" />
                <div className="space-y-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    Участники
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">
                      Менеджер: {call.manager_name || 'Нет имени'}
                    </Badge>
                    <Badge variant="outline">
                      Клиент: {call.client_name || 'Нет имени'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CallSummary;
