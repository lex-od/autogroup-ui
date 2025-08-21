import { FC } from 'react';
import {
  Activity,
  Building,
  Calendar,
  DollarSign,
  Settings,
  Star,
  Target,
  Wrench,
} from 'lucide-react';
import { CallAnalysisResponse } from '@/services/api/calls.api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  analysis: CallAnalysisResponse;
}

const CallPromptDetails: FC<Props> = ({ analysis }) => {
  const serviceInterest = analysis.product_service_interest;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Детали запроса
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Автомобиль:</span>
              <span className="font-medium">
                {serviceInterest.brand_model_car || '—'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Тип сервиса:
              </span>
              <span className="font-medium">
                {serviceInterest.service_type || '—'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Тип диагностики:
              </span>
              <span className="font-medium">
                {serviceInterest.service_type || '—'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Год выпуска:
              </span>
              <span className="font-medium">
                {serviceInterest.desired_year || '—'}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Бюджет:</span>
              <span className="font-medium">
                {serviceInterest.budget_discussed_rub
                  ? `${serviceInterest.budget_discussed_rub} ${serviceInterest.currency || ''}`
                  : '—'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Запчасти:</span>
              <span className="font-medium">
                {serviceInterest.parts_description || '—'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Комплектация:
              </span>
              <span className="font-medium">
                {serviceInterest.desired_configuration || '—'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallPromptDetails;
