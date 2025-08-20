import { FC, useMemo } from 'react';
import { Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CallAnalysisResponse } from '@/services/api/calls.api';
import ServiceChecklistItem from './service-checklist-item/service-checklist-item';

interface Props {
  analysis: CallAnalysisResponse;
  serviceTotalScore: number;
}

const ServiceChecklist: FC<Props> = ({ analysis, serviceTotalScore }) => {
  const serviceMaxScore =
    analysis?.service_script_checklist.max_possible_score_checklist || 0;
  const serviceRatio = serviceMaxScore
    ? serviceTotalScore / serviceMaxScore
    : 0;

  const applicableChecklist = useMemo(() => {
    const checklist = analysis.service_script_checklist.checklist_items;
    if (!checklist) return [];
    return checklist.filter(({ status }) => status !== 'неприменимо');
  }, [analysis]);

  return (
    <Card id="service-checklist">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="size-5 shrink-0" />
          <h2>Чек-лист по скрипту сервиса</h2>
          <Badge variant="secondary" className="ml-auto">
            {serviceTotalScore}/{serviceMaxScore} баллов
          </Badge>
        </CardTitle>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <p>Общий результат</p>
            <p className="font-medium">{(serviceRatio * 100).toFixed(0)}%</p>
          </div>
          <Progress value={serviceRatio * 100} className="h-2" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {applicableChecklist.map((item, index) => (
            <ServiceChecklistItem
              key={item.criterion}
              item={item}
              listIndex={index}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceChecklist;
