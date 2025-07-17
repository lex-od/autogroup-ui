import { FC } from 'react';
import { useRouter } from 'next/navigation';
import {
  Phone,
  User,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Brain,
  MoreVertical,
  Trash2,
  PhoneIncoming,
  PhoneOutgoing,
} from 'lucide-react';
import { toast } from 'sonner';
import { VariantProps } from 'class-variance-authority';
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
import { CallsItem } from '@/services/api/calls-api';
import CallTableSkeleton from './call-table-skeleton';

interface Props {
  calls?: CallsItem[];
  pending: boolean;
  currentPage: number;
  onCurrentPageChange: React.Dispatch<React.SetStateAction<number>>;
  selectedCalls: string[];
  setSelectedCalls: React.Dispatch<React.SetStateAction<string[]>>;
}

const CallTable: FC<Props> = ({
  calls,
  pending,
  currentPage,
  onCurrentPageChange,
  selectedCalls,
  setSelectedCalls,
}) => {
  const router = useRouter();

  const deleteCallMutation = useDeleteCall();

  const totalPages = 1;

  const handleSelectCall = (callId: string) => {
    setSelectedCalls((prev) =>
      prev.includes(callId)
        ? prev.filter((id) => id !== callId)
        : [...prev, callId],
    );
  };

  const handleSelectAll = () => {
    if (!calls?.length) return;

    if (selectedCalls.length === calls.length) {
      setSelectedCalls([]);
      return;
    }
    setSelectedCalls(calls.map((call) => call.id));
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

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: CallsItem['status']) => {
    const variants: Record<
      CallsItem['status'],
      VariantProps<typeof badgeVariants>['variant']
    > = {
      uploaded: 'secondary',
      processing: 'secondary',
      transcribing: 'secondary',
      analyzing: 'secondary',
      completed: 'default',
      failed: 'destructive',
    };
    const labels: Record<CallsItem['status'], string> = {
      uploaded: 'Загружен',
      processing: 'Обработка',
      transcribing: 'Транскрибация',
      analyzing: 'Анализ',
      completed: 'Завершен',
      failed: 'Ошибка',
    };
    return (
      <Badge variant={variants[status]} className="text-xs">
        {status === 'completed' && <Brain className="mr-1 h-3 w-3" />}
        {labels[status]}
      </Badge>
    );
  };

  const getCallTypeIcon = (type: CallsItem['call_type']) => {
    return type === 'incoming' ? (
      <div className="flex items-center space-x-1 text-green-600">
        <PhoneIncoming className="h-3 w-3" />
        <span className="text-xs">Входящий</span>
      </div>
    ) : (
      <div className="flex items-center space-x-1 text-blue-600">
        <PhoneOutgoing className="h-3 w-3" />
        <span className="text-xs">Исходящий</span>
      </div>
    );
  };

  return (
    <Card>
      <CardContent className="p-0">
        {pending && <CallTableSkeleton />}

        {!pending && (
          <>
            {!calls?.length && (
              <div className="py-12 text-center text-muted-foreground">
                <Phone className="mx-auto mb-2 h-12 w-12 opacity-50" />
                <p>Звонки не найдены</p>
                <p className="text-sm">Попробуйте изменить критерии поиска</p>
              </div>
            )}
            {!!calls?.length && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b">
                        <TableHead className="w-12">
                          <input
                            type="checkbox"
                            checked={
                              selectedCalls.length === calls.length &&
                              calls.length > 0
                            }
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
                      {calls.map((call) => (
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
                            {getCallTypeIcon(call.call_type)}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{call.client_name}</p>
                              <p className="text-xs text-muted-foreground">
                                {call.phone_number}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <User className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">
                                {call.manager_name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {call.call_date && (
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm">
                                  {formatDate(call.call_date)}
                                </span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {call.duration_seconds !== null && (
                              <div className="flex items-center space-x-2">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm">
                                  {formatDuration(call.duration_seconds)}
                                </span>
                              </div>
                            )}
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
                  <div className="flex items-center justify-between border-t p-4">
                    <div className="text-sm text-muted-foreground">
                      Страница {currentPage} из {totalPages}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          onCurrentPageChange((prev) => Math.max(1, prev - 1))
                        }
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Назад
                      </Button>
                      <div className="flex items-center space-x-1">
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            const pageNum =
                              currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                            if (pageNum > totalPages) return null;
                            return (
                              <Button
                                key={pageNum}
                                variant={
                                  currentPage === pageNum
                                    ? 'default'
                                    : 'outline'
                                }
                                size="sm"
                                onClick={() => onCurrentPageChange(pageNum)}
                                className="h-8 w-8 p-0"
                              >
                                {pageNum}
                              </Button>
                            );
                          },
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          onCurrentPageChange((prev) =>
                            Math.min(totalPages, prev + 1),
                          )
                        }
                        disabled={currentPage === totalPages}
                      >
                        Вперед
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
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
