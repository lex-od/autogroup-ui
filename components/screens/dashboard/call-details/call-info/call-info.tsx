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
import { formatFileSize } from './call-info.utils';

interface Props {
  call: CallDetailsResponse;
  analysis?: CallAnalysisResponse;
  isServiceCall?: boolean;
  serviceTotalScore: number;
}

const CallInfo: FC<Props> = ({
  call,
  analysis,
  isServiceCall,
  serviceTotalScore,
}) => {
  const callTags = call.tags.filter((tag) => typeof tag === 'string');
  const serviceMaxScore =
    analysis?.service_script_checklist.max_possible_score_checklist || 0;
  const serviceRatio = serviceMaxScore
    ? serviceTotalScore / serviceMaxScore
    : 0;

  const serviceBadgeVariant: VariantProps<typeof badgeVariants>['variant'] =
    (() => {
      if (serviceRatio >= 0.8) return 'tw-green';
      if (serviceRatio >= 0.6) return 'tw-yellow';
      return 'tw-red';
    })();

  const scrollToChecklist = () => {
    const element = document.getElementById('service-checklist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="size-5" />
            Основная информация
          </div>

          <Badge variant="tw-blue">Обычный приоритет *</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-3">
              <CallTypeBadge
                callType={call.call_type}
                className="px-2.5 py-1"
              />

              <div className="flex items-center gap-2">
                <User className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Клиент:</span>
                <span className="font-medium">{call.client_name || '—'}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Телефон:</span>
                <span className="font-medium">{call.phone_number || '—'}</span>
              </div>

              <div className="flex items-center gap-2">
                <UserCheck className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Менеджер:</span>
                <span className="font-medium">{call.manager_name}</span>
              </div>

              <div className="flex items-center gap-2">
                <Building2 className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Отдел:</span>
                <span className="font-medium">
                  {isServiceCall ? 'Сервис' : '—'}
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
                    {serviceTotalScore}/{serviceMaxScore} баллов (
                    {(serviceRatio * 100).toFixed(0)}%)
                  </Badge>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={scrollToChecklist}
                    className="gap-1 text-xs"
                  >
                    <AwardIcon />
                    Чек-лист
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-muted-foreground" />
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
              <Timer className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Время ожидания:
              </span>
              <span className="font-medium">
                {call.wait_time ? `${call.wait_time} сек` : '—'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FileText className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Размер файла:
              </span>
              <span className="font-medium">
                {call.file_size_bytes
                  ? formatFileSize(call.file_size_bytes)
                  : '—'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Headphones className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Формат:</span>
              <span className="font-medium uppercase">
                {call.audio_format || '—'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <Tag className="mr-1 size-4 text-muted-foreground" />
              <span className="mr-1 text-sm text-muted-foreground">Теги:</span>
              {!callTags.length && '—'}

              {callTags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallInfo;
