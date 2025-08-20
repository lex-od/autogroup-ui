import { FC, useMemo } from 'react';
import {
  CheckCircle,
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
import { Badge } from '@/components/ui/badge';
import { type ServiceChecklistItem } from '@/services/api/calls.api';

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
  item: ServiceChecklistItem;
  listIndex: number;
}

const ServiceChecklistItem: FC<Props> = ({ item, listIndex }) => {
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
    return record[item.item_number] || record.default;
  }, [item.item_number]);

  return (
    <div className="flex gap-3 rounded-lg border border-border/50 bg-muted/30 p-3">
      <div className="mt-0.5 shrink-0">{itemIcon}</div>

      <div className="min-w-0 grow space-y-2">
        {/* Header */}
        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium break-words">
              {listIndex + 1}. {item.criterion}
            </p>
            <Badge
              variant={item.type === 'Обязательный' ? 'tw-indigo' : 'tw-blue'}
            >
              {item.type}
            </Badge>
          </div>

          <Badge variant={item.score ? 'tw-green' : 'tw-red'}>
            {item.score}/1
          </Badge>
        </div>

        {/* Main */}
        <p className="text-xs leading-relaxed text-muted-foreground">
          [description]
        </p>

        <div className="rounded border-l-4 border-blue-400 bg-card p-2 dark:border-blue-800">
          <p className="text-xs text-blue-700 dark:text-blue-200">
            <strong>Объяснение:</strong> {item.reason}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceChecklistItem;
