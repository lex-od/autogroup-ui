import { FC } from 'react';
import { Target, Calendar, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CallAnalysisResponse } from '@/services/api/calls.api';
import AiAnalysisActionItem from './ai-analysis-action-item';

interface Props {
  actions: CallAnalysisResponse['action_items'];
}

const AiAnalysisActions: FC<Props> = ({ actions }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="size-5" />
          <span>Действия</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {actions.map((action) => (
            <AiAnalysisActionItem
              key={action}
              title={action}
              priority="medium"
              isCompleted={false}
            />
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
          <Button size="sm" variant="outline" className="flex-1">
            <Mail />
            Отправить *
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Calendar />
            Запланировать *
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiAnalysisActions;
