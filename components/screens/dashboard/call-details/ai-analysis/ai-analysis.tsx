import { FC } from 'react';
import { Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CallAnalysisResponse } from '@/services/api/calls.api';
import StarMetric from './star-metric';

interface Props {
  analysis?: CallAnalysisResponse;
  analysisPending: boolean;
}

const AiAnalysis: FC<Props> = ({ analysis, analysisPending }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="size-5" />
          <span>AI Анализ</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {!analysisPending && !analysis && (
          <div className="py-4 text-center">
            <Brain className="mx-auto mb-2 size-12 text-muted-foreground" />
            <p className="text-muted-foreground">AI анализ недоступен</p>
          </div>
        )}

        {!analysisPending && analysis && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Настроение
                </span>
                <span className="text-sm font-semibold">
                  {(analysis.sentiment_score * 100).toFixed(0)}
                  <span className="text-muted-foreground">%</span>
                </span>
              </div>
              <Progress
                value={analysis.sentiment_score * 100}
                className="h-2"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Качество обслуживания
              </span>
              <StarMetric starCount={analysis.service_quality_score} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Удовлетворенность клиента *
              </span>
              <StarMetric starCount={4} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Уверенность менеджера *
                </span>
                <span className="text-sm font-semibold">
                  {(0.85 * 100).toFixed(0)}
                  <span className="text-muted-foreground">%</span>
                </span>
              </div>
              <Progress value={0.85 * 100} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Полнота консультации *
                </span>
                <span className="text-sm font-semibold">
                  100
                  <span className="text-muted-foreground">%</span>
                </span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AiAnalysis;
