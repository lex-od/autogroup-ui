import { FC, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  Phone,
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
import { toast } from 'sonner';
import { VariantProps } from 'class-variance-authority';
import { format, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteCall } from '@/services/api/queries/calls.queries';
import { CallsItem, CallsResponse } from '@/services/api/calls.api';
import CallTableSkeleton from './call-table-skeleton';
import CallTablePagination from './call-table-pagination';

interface Props {
  calls?: CallsResponse;
  callsPending: boolean;
  currentPage: number;
  onCurrentPageChange: (currentPage: number) => void;
  selectedCalls: string[];
  setSelectedCalls: React.Dispatch<React.SetStateAction<string[]>>;
}

const CallTable: FC<Props> = ({
  calls,
  callsPending,
  currentPage,
  onCurrentPageChange,
  selectedCalls,
  setSelectedCalls,
}) => {
  const router = useRouter();

  const deleteCallMutation = useDeleteCall();

  const totalPages = Math.ceil((calls?.total || 0) / 10);

  const handleSelectCall = (callId: string) => {
    setSelectedCalls((prev) =>
      prev.includes(callId)
        ? prev.filter((id) => id !== callId)
        : [...prev, callId],
    );
  };

  const handleSelectAll = () => {
    if (!calls?.data.length) return;

    if (selectedCalls.length === calls?.data.length) {
      setSelectedCalls([]);
      return;
    }
    setSelectedCalls(calls?.data.map((call) => call.id));
  };

  const handleViewCall = (callId: string) => {
    router.push(`/dashboard/calls/${callId}`);
  };

  const handleDeleteCall = async (callId: string) => {
    try {
      await deleteCallMutation.mutateAsync(callId);
      toast.success('Звонок успешно удален');
      setSelectedCalls((prev) => prev.filter((id) => id !== callId));
    } catch (error) {
      toast.error('Ошибка при удалении звонка');
      console.error('Delete call error:', error);
    }
  };

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
    <Card className="py-3">
      <CardContent className="p-0">
        {callsPending && <CallTableSkeleton />}

        {!callsPending && (
          <>
            {!calls?.data.length && (
              <div className="py-12 text-center text-muted-foreground">
                <Phone className="mx-auto mb-2 h-12 w-12 opacity-50" />
                <p>Звонки не найдены</p>
                <p className="text-sm">Попробуйте изменить критерии поиска</p>
              </div>
            )}

            {!!calls?.data.length && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b">
                        <TableHead className="w-12">
                          <input
                            type="checkbox"
                            checked={selectedCalls.length === calls.data.length}
                            onChange={handleSelectAll}
                            className="rounded"
                          />
                        </TableHead>
                        <TableHead>Тип</TableHead>
                        <TableHead>Клиент / Телефон</TableHead>
                        <TableHead>Менеджер</TableHead>
                        <TableHead>Дата и время</TableHead>
                        <TableHead>Длительность</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead className="w-16">Действия</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {calls.data.map((call) => (
                        <TableRow
                          key={call.id}
                          className="cursor-default border-b border-border/40 hover:bg-muted/50"
                          onClick={() => handleViewCall(call.id)}
                        >
                          <TableCell
                            onClick={(e: React.MouseEvent) =>
                              e.stopPropagation()
                            }
                          >
                            <input
                              type="checkbox"
                              checked={selectedCalls.includes(call.id)}
                              onChange={() => handleSelectCall(call.id)}
                              className="rounded"
                            />
                          </TableCell>

                          <TableCell>
                            {getCallTypeBadge(call.call_type)}
                          </TableCell>

                          <TableCell>
                            <div>
                              {call.client_name && (
                                <div className="flex items-center gap-1">
                                  <User className="size-3 text-muted-foreground" />
                                  <p className="font-medium">
                                    {call.client_name}
                                  </p>
                                </div>
                              )}
                              <p className="text-xs text-muted-foreground">
                                {call.phone_number}
                              </p>
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
                                <span>
                                  {format(
                                    parseISO(call.call_date),
                                    'dd.MM.yyyy, HH:mm',
                                  )}
                                </span>
                              </Badge>
                            )}
                          </TableCell>

                          <TableCell>
                            <Badge variant="tw-teal">
                              <Clock />
                              <span>
                                {formatDuration(call.duration_seconds)}
                              </span>
                            </Badge>
                          </TableCell>

                          <TableCell>{getStatusBadge(call.status)}</TableCell>

                          <TableCell
                            onClick={(e: React.MouseEvent) =>
                              e.stopPropagation()
                            }
                          >
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleDeleteCall(call.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Удалить
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Пагинация */}
                {totalPages > 1 && (
                  <CallTablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onCurrentPageChange={onCurrentPageChange}
                  />
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CallTable;
