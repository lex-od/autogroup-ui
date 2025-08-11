import { FC } from 'react';
import { VariantProps } from 'class-variance-authority';
import {
  AwardIcon,
  Building2,
  Clock,
  FileText,
  Headphones,
  Info,
  Phone,
  Tag,
  Timer,
  User,
  UserCheck,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CallAnalysisResponse,
  CallDetailsResponse,
} from '@/services/api/calls.api';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CallTypeBadge from '@/components/ui-custom/call-type-badge';
import { formatDuration } from '../call-details.utils';

interface Props {
  call: CallDetailsResponse;
  analysis?: CallAnalysisResponse;
}

const CallInfo: FC<Props> = ({ call, analysis }) => {
  const isServiceCall = analysis?.topics.some((topic) => {
    return ['сервис', 'обслуживание', 'ТО'].includes(topic);
  });
  const serviceScore = 16;
  const maxServiceScore = 20;
  const serviceRatio = maxServiceScore ? serviceScore / maxServiceScore : 0;

  const serviceBadgeVariant: VariantProps<typeof badgeVariants>['variant'] =
    (() => {
      if (serviceRatio >= 0.8) return 'tw-green';
      if (serviceRatio >= 0.6) return 'tw-yellow';
      return 'tw-red';
    })();

  const scrollToChecklist = () => {
    const checklistElement = document.getElementById('service-checklist');
    if (checklistElement) {
      checklistElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Основная информация
          </div>

          <Badge variant="tw-blue">Обычный приоритет *</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <CallTypeBadge
                callType={call.call_type}
                className="px-2.5 py-1"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Клиент:</span>
                <span className="font-medium">{call.client_name || '—'}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Телефон:</span>
                <span className="font-medium">{call.phone_number || '—'}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Менеджер:</span>
                <span className="font-medium">{call.manager_name}</span>
              </div>

              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Отдел:</span>
                <span className="font-medium">
                  {!analysis && '—'}
                  {analysis && (isServiceCall ? 'Сервис *' : 'Продажи *')}
                </span>
              </div>
            </div>

            {/* Ключевые темы */}
            {analysis && (
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Ключевые темы:
                </span>
                <div className="flex flex-wrap gap-1">
                  {analysis.topics.map((topic) => (
                    <Badge key={topic} variant="outline" className="capitalize">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Итоговая оценка для сервисных звонков с кнопкой-якорем */}
            {isServiceCall && (
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Итоговая оценка сервиса:
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant={serviceBadgeVariant} className="text-sm">
                    {serviceScore}/{maxServiceScore} баллов (
                    {(serviceRatio * 100).toFixed(0)}%) *
                  </Badge>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={scrollToChecklist}
                    className="flex items-center gap-1 text-xs"
                  >
                    <AwardIcon className="h-3 w-3" />
                    Перейти к чек-листу
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Длительность:
                </span>
                <span className="font-medium">
                  {typeof call.duration_seconds === 'number'
                    ? formatDuration(call.duration_seconds)
                    : '—'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Время ожидания:
                </span>
                <span className="font-medium">5 сек *</span>
              </div>

              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Размер файла:
                </span>
                <span className="font-medium">0.24 MB *</span>
              </div>

              <div className="flex items-center gap-2">
                <Headphones className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Формат:</span>
                <span className="font-medium uppercase">mp3 *</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Теги:</span>
              <div className="flex gap-1">
                <Badge variant="secondary">VIP *</Badge>
                <Badge variant="secondary">Новый клиент *</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallInfo;

// <Card>
//   <CardContent className="pt-6">
//     <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//       <div className="flex items-center space-x-3">
//         <Phone className="h-5 w-5 text-muted-foreground" />
//         <div>
//           <p className="text-sm text-muted-foreground">Номер телефона</p>
//           <p className="font-medium">{call.phone_number || 'Нет номера'}</p>
//         </div>
//       </div>
//       <div className="flex items-center space-x-3">
//         <User className="h-5 w-5 text-muted-foreground" />
//         <div>
//           <p className="text-sm text-muted-foreground">Клиент</p>
//           <p className="font-medium">
//             {call.client_name || 'Нет названия'}
//           </p>
//         </div>
//       </div>
//       <div className="flex items-center space-x-3">
//         <User className="h-5 w-5 text-muted-foreground" />
//         <div>
//           <p className="text-sm text-muted-foreground">Менеджер</p>
//           <p className="font-medium">{call.manager_name || 'Нет имени'}</p>
//         </div>
//       </div>
//       <div className="flex items-center space-x-3">
//         <Clock className="h-5 w-5 text-muted-foreground" />
//         <div>
//           <p className="text-sm text-muted-foreground">Длительность</p>
//           <p className="font-medium">
//             {call.duration_seconds
//               ? formatDuration(call.duration_seconds)
//               : 'Нет данных'}
//           </p>
//         </div>
//       </div>
//     </div>
//   </CardContent>
// </Card>
