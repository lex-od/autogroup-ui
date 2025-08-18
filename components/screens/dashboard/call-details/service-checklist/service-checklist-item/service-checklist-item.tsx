import { FC, useMemo } from 'react';
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
import { Badge, badgeVariants } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface FakeChecklistItem {
  id: string;
  name: string;
  description: string;
  category: 'obligatory' | 'contextual';
  score: 1;
  maxScore: 1;
  explanation: string;
}
interface Props {
  item: FakeChecklistItem;
}

const ServiceChecklistItem: FC<Props> = ({ item }) => {
  const scorePercentage = item.score / item.maxScore;

  const itemIcon = useMemo(() => {
    const record: Record<string, React.ReactNode> = {
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
      default: <CheckCircle className="size-4" />,
    };
    return record[item.id] || record.default;
  }, [item.id]);

  const statusIcon = (() => {
    // Use this icon if we render not applicable items
    // <Clock className="size-4 text-gray-400 dark:text-gray-500" />;

    if (scorePercentage >= 0.8) {
      return (
        <CheckCircle className="size-4 text-green-500 dark:text-green-400" />
      );
    }
    if (scorePercentage >= 0.6) {
      return (
        <AlertTriangle className="size-4 text-yellow-500 dark:text-yellow-400" />
      );
    }
    return <XCircle className="size-4 text-red-500 dark:text-red-400" />;
  })();

  const scoreBadgeVariant = ((): VariantProps<
    typeof badgeVariants
  >['variant'] => {
    if (scorePercentage >= 0.8) {
      return 'tw-green';
    }
    if (scorePercentage >= 0.6) {
      return 'tw-yellow';
    }
    return 'tw-red';
  })();

  const categoryColors = (() => {
    return item.category === 'obligatory'
      ? 'bg-red-50 border-red-200 dark:bg-red-950/50 dark:border-red-950'
      : 'bg-blue-50 border-blue-200 dark:bg-blue-950/50 dark:border-blue-950';
  })();

  return (
    <div
      key={item.id}
      className={cn('flex gap-3 rounded-lg border p-3', categoryColors)}
    >
      <div className="mt-0.5 shrink-0">{itemIcon}</div>

      <div className="min-w-0 grow space-y-2">
        {/* Header */}
        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium break-words">
              {item.id}. {item.name}
            </p>
            <Badge
              variant={item.category === 'obligatory' ? 'tw-red' : 'tw-blue'}
            >
              {item.category === 'obligatory' ? 'Обязательный' : 'Контекстный'}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {statusIcon}
            <Badge variant={scoreBadgeVariant}>
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
  );
};

export default ServiceChecklistItem;
