import { FC } from 'react';
import { Brain, Star } from 'lucide-react';
import { VariantProps } from 'class-variance-authority';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CallAnalysisResponse } from '@/services/api/calls.api';
import { cn } from '@/lib/utils';

interface Props {
  analysis?: CallAnalysisResponse;
  analysisPending: boolean;
}

const AiAnalysis: FC<Props> = ({ analysis, analysisPending }) => {
  const getSentimentBadge = (
    sentimentLabel: CallAnalysisResponse['sentiment_label'],
  ) => {
    const variants: Record<
      CallAnalysisResponse['sentiment_label'],
      VariantProps<typeof badgeVariants>['variant']
    > = {
      positive: 'success',
      negative: 'destructive',
      neutral: 'warning',
    };
    const labels: Record<CallAnalysisResponse['sentiment_label'], string> = {
      positive: 'Позитивное',
      negative: 'Негативное',
      neutral: 'Нейтральное',
    };
    return (
      <Badge variant={variants[sentimentLabel]}>{labels[sentimentLabel]}</Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5" />
          <span>AI Анализ</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {!analysisPending && (
          <>
            {!analysis && (
              <div className="py-4 text-center">
                <Brain className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">AI анализ недоступен</p>
              </div>
            )}

            {analysis && (
              <>
                {/* Настроение */}
                <div>
                  <p className="mb-2 text-sm font-medium">Настроение</p>
                  <div className="flex items-center justify-between">
                    {getSentimentBadge(analysis.sentiment_label)}
                    <span className="text-sm text-muted-foreground">
                      {(analysis.sentiment_score * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Качество лида */}
                <div>
                  <p className="mb-2 text-sm font-medium">Качество лида</p>
                  {/* <Badge
                    variant={
                      aiAnalysis.leadQuality === 'hot'
                        ? 'destructive'
                        : aiAnalysis.leadQuality === 'warm'
                          ? 'warning'
                          : 'secondary'
                    }
                  >
                    {aiAnalysis.leadQuality === 'hot'
                      ? 'Горячий'
                      : aiAnalysis.leadQuality === 'warm'
                        ? 'Теплый'
                        : 'Холодный'}
                  </Badge> */}
                  <p>[no-data]</p>
                </div>

                {/* Оценка удовлетворенности */}
                <div>
                  <p className="mb-2 text-sm font-medium">Удовлетворенность</p>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-4 w-4',
                          i < analysis.service_quality_score
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300',
                        )}
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {analysis.service_quality_score}/5
                    </span>
                  </div>
                </div>

                {/* Ключевые темы */}
                <div>
                  <p className="mb-2 text-sm font-medium">Ключевые темы</p>

                  {!analysis.topics.length && <p>Нет данных</p>}

                  <div className="flex flex-wrap gap-1">
                    {analysis.topics.map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Резюме */}
                <div>
                  <p className="mb-2 text-sm font-medium">Резюме</p>
                  <p className="text-sm text-muted-foreground">
                    {analysis.summary || 'Нет данных'}
                  </p>
                </div>

                {/* Действия */}
                <div>
                  <p className="mb-2 text-sm font-medium">
                    Рекомендуемые действия
                  </p>

                  {!analysis.action_items.length && <p>Нет данных</p>}

                  <ul className="space-y-1">
                    {analysis.action_items.map((action) => (
                      <li
                        key={action}
                        className="flex items-start space-x-2 text-sm text-muted-foreground"
                      >
                        <span className="text-primary">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AiAnalysis;
