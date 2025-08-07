import { FC, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Clock,
  Calendar,
  Brain,
  MoreVertical,
  Trash2,
  PhoneIncoming,
  PhoneOutgoing,
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  LoaderCircle,
} from 'lucide-react';
import { VariantProps } from 'class-variance-authority';
import { format, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CallsItem } from '@/services/api/calls.api';

interface Props {
  call: CallsItem;
  isSelected: boolean;
  onChangeSelected: (callId: string, isSelected: boolean) => void;
}

const CallTableRow: FC<Props> = ({ call, isSelected, onChangeSelected }) => {
  const router = useRouter();

  const formatDuration = (durationSeconds: number | null) => {
    if (!durationSeconds) {
      return '--:--';
    }
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = durationSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusBadge = (status: CallsItem['status']) => {
    const configRecord: Record<
      CallsItem['status'],
      {
        variant: VariantProps<typeof badgeVariants>['variant'];
        icon: ReactNode;
        label: string;
      }
    > = {
      uploaded: {
        variant: 'tw-blue',
        icon: <Upload />,
        label: 'Загружен',
      },
      processing: {
        variant: 'tw-cyan',
        icon: <LoaderCircle className="animate-spin" />,
        label: 'Обработка',
      },
      transcribing: {
        variant: 'tw-yellow',
        icon: <FileText />,
        label: 'Транскрибация',
      },
      analyzing: {
        variant: 'tw-purple',
        icon: <Brain />,
        label: 'Анализ',
      },
      completed: {
        variant: 'tw-indigo',
        icon: <CheckCircle />,
        label: 'Завершен',
      },
      failed: {
        variant: 'tw-red',
        icon: <XCircle />,
        label: 'Ошибка',
      },
    };
    const config = configRecord[status];
    if (!config) {
      return null;
    }
    return (
      <Badge variant={config.variant}>
        {config.icon}
        <span>{config.label}</span>
      </Badge>
    );
  };

  const getCallTypeBadge = (type: CallsItem['call_type']) => {
    return type === 'incoming' ? (
      <Badge variant="tw-green">
        <PhoneIncoming />
        <span>Входящий</span>
      </Badge>
    ) : (
      <Badge variant="tw-blue">
        <PhoneOutgoing />
        <span>Исходящий</span>
      </Badge>
    );
  };

  return (
    <TableRow
      className="cursor-default border-b border-border/40 hover:bg-muted/50"
      onClick={() => router.push(`/dashboard/calls/${call.id}`)}
    >
      <TableCell onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onChangeSelected(call.id, e.target.checked)}
          className="rounded"
        />
      </TableCell>

      <TableCell>{getCallTypeBadge(call.call_type)}</TableCell>

      <TableCell>
        <div>
          {call.client_name && (
            <div className="flex items-center gap-1">
              <User className="size-3 text-muted-foreground" />
              <p className="font-medium">{call.client_name}</p>
            </div>
          )}
          <p className="text-xs text-muted-foreground">{call.phone_number}</p>
        </div>
      </TableCell>

      <TableCell>
        {call.manager_name && (
          <div className="flex items-center gap-1">
            <User className="size-3 text-muted-foreground" />
            <p>{call.manager_name}</p>
          </div>
        )}
      </TableCell>

      <TableCell>
        {call.call_date && (
          <Badge variant="tw-orange">
            <Calendar />
            <span>{format(parseISO(call.call_date), 'dd.MM.yyyy, HH:mm')}</span>
          </Badge>
        )}
      </TableCell>

      <TableCell>
        <Badge variant="tw-teal">
          <Clock />
          <span>{formatDuration(call.duration_seconds)}</span>
        </Badge>
      </TableCell>

      <TableCell>{getStatusBadge(call.status)}</TableCell>

      <TableCell onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => null} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default CallTableRow;
