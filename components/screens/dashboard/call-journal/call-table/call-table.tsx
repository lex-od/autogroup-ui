import { FC } from 'react';
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
  Loader2,
  FileText,
  BrainCircuit,
  CheckCircle,
  XCircle,
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
import CallStatusBadge from '@/components/ui/call-status-badge';
import CallTypeBadge from '@/components/ui/call-type-badge';
import { useDeleteCall } from '@/services/api/queries/calls.queries';
import { CallsItem, CallsResponse } from '@/services/api/calls-api';
import CallTableSkeleton from './call-table-skeleton';

interface Props {
  calls?: CallsResponse;
  callsPending: boolean;
  currentPage: number;
  onCurrentPageChange: (currentPage: number) => void;
  selectedCalls: string[];
  setSelectedCalls: React.Dispatch<React.SetStateAction<string[]>>;
  visibleColumns?: Record<string, boolean>;
}

const CallTable: FC<Props> = ({
  calls,
  callsPending,
  currentPage,
  onCurrentPageChange,
  selectedCalls,
  setSelectedCalls,
  visibleColumns = {},
}) => {
  const router = useRouter();

  const deleteCallMutation = useDeleteCall();

  // Функция для проверки видимости колонки
  const isColumnVisible = (columnId: string) => {
    return visibleColumns[columnId] !== false; // По умолчанию видима, если не указано иное
  };

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

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '--:--';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '--';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    return <CallStatusBadge status={status} />;
  };

  const getCallTypeIcon = (callType: CallsItem['callType']) => {
    return callType === 'incoming' ? (
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
    <Card className="py-0.5">
      <CardContent className="p-0">
        {callsPending && <CallTableSkeleton />}

        {!callsPending && (
          <>
            {!calls?.data.length && (
              <div className="py-4 text-center text-muted-foreground">
                <Phone className="mx-auto mb-2 h-8 w-8 opacity-50" />
                <p className="text-sm">Звонки не найдены</p>
                <p className="text-xs">Попробуйте изменить критерии поиска</p>
              </div>
            )}

            {!!calls?.data.length && (
              <div className="space-y-1">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b">
                      {isColumnVisible('select') && (
                        <TableHead className="w-10">
                          <input
                            type="checkbox"
                            checked={selectedCalls.length === calls.data.length}
                            onChange={handleSelectAll}
                            className="rounded"
                          />
                        </TableHead>
                      )}
                      {isColumnVisible('type') && <TableHead className="w-20">Тип</TableHead>}
                      {isColumnVisible('client') && <TableHead>Клиент / Телефон</TableHead>}
                      {isColumnVisible('manager') && <TableHead>Менеджер</TableHead>}
                      {isColumnVisible('date') && <TableHead>Дата и время</TableHead>}
                      {isColumnVisible('duration') && <TableHead>Длительность</TableHead>}
                      {isColumnVisible('status') && <TableHead>Статус</TableHead>}
                      {isColumnVisible('actions') && <TableHead className="w-16">Действия</TableHead>}
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {calls.data.map((call) => (
                      <TableRow
                        key={call.id}
                        className="cursor-default border-b border-border/40 hover:bg-muted/50"
                        onClick={() => handleViewCall(call.id)}
                      >
                        {isColumnVisible('select') && (
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
                        )}
                        {isColumnVisible('type') && (
                          <TableCell>
                            <CallTypeBadge callType={call.callType} />
                          </TableCell>
                        )}
                        {isColumnVisible('client') && (
                          <TableCell className="py-1">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm font-medium">{call.clientName || '—'}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{call.phoneNumber || '—'}</span>
                              </div>
                            </div>
                          </TableCell>
                        )}
                        {isColumnVisible('manager') && (
                          <TableCell className="py-1">
                            <div className="flex items-center space-x-2">
                              <span className="inline-flex items-center gap-1 px-1 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                <User className="h-3 w-3" />
                                {call.managerName || 'Unknown'}
                              </span>
                            </div>
                          </TableCell>
                        )}
                        {isColumnVisible('date') && (
                          <TableCell className="py-1">
                            <div className="flex items-center space-x-2">
                              <span className="inline-flex items-center gap-1 px-1 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                                <Calendar className="h-3 w-3" />
                                {formatDate(call.callDate || call.createdAt)}
                              </span>
                            </div>
                          </TableCell>
                        )}
                        {isColumnVisible('duration') && (
                          <TableCell className="py-1">
                            <div className="flex items-center space-x-2">
                              <span className="inline-flex items-center gap-1 px-1 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 border border-teal-200">
                                <Clock className="h-3 w-3" />
                                {formatDuration(call.duration)}
                              </span>
                            </div>
                          </TableCell>
                        )}
                        {isColumnVisible('status') && (
                          <TableCell>{getStatusBadge(call.status)}</TableCell>
                        )}
                        {isColumnVisible('actions') && (
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
                                  className="h-7 w-7 p-0"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleDeleteCall(call.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" /> Удалить
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CallTable;
