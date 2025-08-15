import { FC } from 'react';
import { VariantProps } from 'class-variance-authority';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Users,
  MessageSquare,
  Award,
  TrendingUp,
  Phone,
  User,
  Car,
  Wrench,
  MapPin,
  Calendar,
  FileText,
  Star,
  Info,
  Building,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const serviceChecklistData = [
  {
    id: '1',
    name: 'Реакция на звонок (количество гудков)',
    description:
      'Оцени, если транскрипция предоставляет метаданные о времени до ответа или явные указания на гудки. Балл: 1, если ответ в течение 20 секунд.',
    category: 'obligatory' as const,
    completed: true,
    score: 1,
    maxScore: 1,
    explanation: 'Ответ получен в течение 15 секунд',
  },
];

const ServiceChecklist: FC = () => {
  const getItemIcon = (id: string) => {
    const iconRecord: Record<string, React.ReactNode> = {
      1: <Phone className="size-4 text-blue-500 dark:text-blue-400" />,
      2: <Building className="size-4 text-green-500 dark:text-green-400" />,
      3: <Users className="size-4 text-purple-500 dark:text-purple-400" />,
      4: <User className="size-4 text-orange-500 dark:text-orange-400" />,
      5: (
        <MessageSquare className="size-4 text-indigo-500 dark:text-indigo-400" />
      ),
      6: <User className="size-4 text-teal-500 dark:text-teal-400" />,
      7: <User className="size-4 text-pink-500 dark:text-pink-400" />,
      8: <Car className="size-4 text-red-500 dark:text-red-400" />,
      9: <TrendingUp className="size-4 text-yellow-500 dark:text-yellow-400" />,
      10: <Wrench className="size-4 text-gray-500 dark:text-gray-400" />,
      11: <Info className="size-4 text-blue-600 dark:text-blue-300" />,
      12: <Calendar className="size-4 text-green-600 dark:text-green-300" />,
      13: (
        <MessageSquare className="size-4 text-purple-600 dark:text-purple-300" />
      ),
      14: <Clock className="size-4 text-orange-600 dark:text-orange-300" />,
      15: <MapPin className="size-4 text-indigo-600 dark:text-indigo-300" />,
      16: <Calendar className="size-4 text-teal-600 dark:text-teal-300" />,
      17: <Phone className="size-4 text-pink-600 dark:text-pink-300" />,
      18: <FileText className="size-4 text-red-600 dark:text-red-300" />,
      19: <Star className="size-4 text-yellow-600 dark:text-yellow-300" />,
      20: <Award className="size-4 text-gray-600 dark:text-gray-300" />,
    };
    return iconRecord[id] || <CheckCircle className="size-4" />;
  };

  const getStatusIcon = (percentage: number) => {
    // Use this icon if we render not applicable items
    // <Clock className="size-4 text-gray-400 dark:text-gray-500" />;

    if (percentage >= 0.8) {
      return (
        <CheckCircle className="size-4 text-green-500 dark:text-green-400" />
      );
    }
    if (percentage >= 0.6) {
      return (
        <AlertTriangle className="size-4 text-yellow-500 dark:text-yellow-400" />
      );
    }
    return <XCircle className="size-4 text-red-500 dark:text-red-400" />;
  };

  const getScoreBadgeVariant = (
    percentage: number,
  ): VariantProps<typeof badgeVariants>['variant'] => {
    if (percentage >= 0.8) {
      return 'tw-green';
    }
    if (percentage >= 0.6) {
      return 'tw-yellow';
    }
    return 'tw-red';
  };

  const getCategoryColors = (category: string) => {
    return category === 'obligatory'
      ? 'bg-red-50 border-red-200 dark:bg-red-950/50 dark:border-red-950'
      : 'bg-blue-50 border-blue-200 dark:bg-blue-950/50 dark:border-blue-950';
  };

  return (
    <Card id="service-checklist">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="size-5 shrink-0" />
          <h2>Чек-лист по скрипту сервиса</h2>
          <Badge variant="secondary" className="ml-auto">
            1/1 баллов
          </Badge>
        </CardTitle>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <p>Общий результат</p>
            <p className="font-medium">100%</p>
          </div>
          <Progress value={100} className="h-2" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {serviceChecklistData.map((item) => (
            <div
              key={item.id}
              className={cn(
                'flex gap-3 rounded-lg border p-3',
                getCategoryColors(item.category),
              )}
            >
              <div className="mt-0.5 shrink-0">{getItemIcon(item.id)}</div>

              <div className="min-w-0 grow space-y-2">
                {/* Header */}
                <div className="flex justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium break-words">
                      {item.id}. {item.name}
                    </p>
                    <Badge
                      variant={
                        item.category === 'obligatory' ? 'tw-red' : 'tw-blue'
                      }
                    >
                      {item.category === 'obligatory'
                        ? 'Обязательный'
                        : 'Контекстный'}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.score / item.maxScore)}
                    <Badge
                      variant={getScoreBadgeVariant(item.score / item.maxScore)}
                    >
                      {item.score}/{item.maxScore}
                    </Badge>
                  </div>
                </div>

                {/* Main */}
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                <div className="rounded border-l-4 border-blue-400 bg-card p-2 dark:border-blue-800">
                  <p className="text-xs text-blue-700 dark:text-blue-200">
                    <strong>Объяснение:</strong> {item.explanation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceChecklist;
