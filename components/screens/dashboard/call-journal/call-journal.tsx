'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Filter,
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
  ChevronDown,
} from 'lucide-react';
import { toast } from 'sonner';
import { VariantProps } from 'class-variance-authority';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  DateRangePicker,
  type DateRange,
} from '@/components/ui/date-range-picker.legacy';
import {
  useDeleteCall,
  useDeleteCalls,
} from '@/services/api/queries/calls.queries';
import { CallsItem, useCallsQuery } from '@/services/api/calls-api';

const CallJournal = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCalls, setSelectedCalls] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    sentiment: 'all',
    manager: 'all',
    dateFrom: '',
    dateTo: '',
  });

  const { data: calls, isPending: callsPending } = useCallsQuery();

  // Мутации
  const deleteCallMutation = useDeleteCall();
  const deleteCallsMutation = useDeleteCalls();

  const totalPages = 1;

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateRangeChange = (range: DateRange) => {
    setFilters((prev) => ({
      ...prev,
      dateFrom: range.from,
      dateTo: range.to,
    }));
  };

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

  const handleDeleteSelected = async () => {
    if (selectedCalls.length === 0) return;

    try {
      await deleteCallsMutation.mutateAsync(selectedCalls);
      toast.success(`Удалено звонков: ${selectedCalls.length}`);
      setSelectedCalls([]);
    } catch (error) {
      toast.error('Ошибка при удалении звонков');
      console.error('Delete calls error:', error);
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
    <div className="h-full w-full">
      <div className="mx-auto max-w-full space-y-4 p-4 lg:p-6">
        {/* Компактные KPI карточки */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Card className="bg-card/50">
            <CardContent className="p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Всего звонков</p>
                  <p className="text-base font-bold">[no-data]</p>
                </div>
                <Phone className="h-3 w-3 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardContent className="p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Сегодня</p>
                  <p className="text-base font-bold">[no-data]</p>
                </div>
                <Calendar className="h-3 w-3 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardContent className="p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Завершенные</p>
                  <p className="text-base font-bold">[no-data]</p>
                </div>
                <User className="h-3 w-3 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardContent className="p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Пропущенные</p>
                  <p className="text-base font-bold">[no-data]</p>
                </div>
                <Clock className="h-3 w-3 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Поиск и компактная кнопка фильтров */}
        <div className="flex items-center space-x-3">
          {/* Поиск */}
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              placeholder="Поиск по номеру телефона, имени клиента или менеджеру..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Компактная кнопка фильтров */}
          <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <CollapsibleTrigger className="inline-flex h-9 shrink-0 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium whitespace-nowrap shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
              <Filter className="mr-2 h-4 w-4" />
              Фильтры
              <ChevronDown className="ml-2 h-4 w-4" />
            </CollapsibleTrigger>
          </Collapsible>

          {/* Кнопка удаления выбранных */}
          {selectedCalls.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteSelected}
              disabled={deleteCallsMutation.isPending}
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Удалить ({selectedCalls.length})
            </Button>
          )}
        </div>

        {/* Выпадающий блок с фильтрами */}
        <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <CollapsibleContent>
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                  {/* Период дат - двойной календарь */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Период</label>
                    <DateRangePicker
                      value={{
                        from: filters.dateFrom,
                        to: filters.dateTo,
                      }}
                      onChange={handleDateRangeChange}
                      placeholder="Выберите период"
                      className="w-full"
                    />
                  </div>

                  {/* Статус */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Статус</label>
                    <select
                      className="w-full rounded-md border bg-background p-2 text-sm"
                      value={filters.status}
                      onChange={(e) =>
                        handleFilterChange('status', e.target.value)
                      }
                    >
                      <option value="all">Все статусы</option>
                      <option value="completed">Завершенные</option>
                      <option value="missed">Пропущенные</option>
                      <option value="in-progress">В процессе</option>
                    </select>
                  </div>

                  {/* Тип */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Тип</label>
                    <select
                      className="w-full rounded-md border bg-background p-2 text-sm"
                      value={filters.type}
                      onChange={(e) =>
                        handleFilterChange('type', e.target.value)
                      }
                    >
                      <option value="all">Все типы</option>
                      <option value="incoming">Входящие</option>
                      <option value="outgoing">Исходящие</option>
                    </select>
                  </div>

                  {/* Настроение */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Настроение</label>
                    <select
                      className="w-full rounded-md border bg-background p-2 text-sm"
                      value={filters.sentiment}
                      onChange={(e) =>
                        handleFilterChange('sentiment', e.target.value)
                      }
                    >
                      <option value="all">Любое</option>
                      <option value="positive">Позитивное</option>
                      <option value="neutral">Нейтральное</option>
                      <option value="negative">Негативное</option>
                    </select>
                  </div>

                  {/* Менеджер */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Менеджер</label>
                    <select
                      className="w-full rounded-md border bg-background p-2 text-sm"
                      value={filters.manager}
                      onChange={(e) =>
                        handleFilterChange('manager', e.target.value)
                      }
                    >
                      <option value="all">Все менеджеры</option>
                      <option value="Анна Смирнова">Анна Смирнова</option>
                      <option value="Иван Петров">Иван Петров</option>
                      <option value="Петр Иванов">Петр Иванов</option>
                      <option value="Елена Кузнецова">Елена Кузнецова</option>
                      <option value="Сергей Волков">Сергей Волков</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Таблица звонков */}
        <Card>
          <CardContent className="p-0">
            {callsPending && (
              <div className="space-y-3 p-6">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex animate-pulse items-center space-x-4 rounded-lg p-3"
                  >
                    <div className="h-4 w-4 rounded bg-gray-200"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/4 rounded bg-gray-200"></div>
                      <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!callsPending && (
              <>
                {!calls?.length && (
                  <div className="py-12 text-center text-muted-foreground">
                    <Phone className="mx-auto mb-2 h-12 w-12 opacity-50" />
                    <p>Звонки не найдены</p>
                    <p className="text-sm">
                      Попробуйте изменить критерии поиска
                    </p>
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
                              className="border-b border-border/40 hover:bg-muted/50"
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
                                  <p className="font-medium">
                                    {call.client_name}
                                  </p>
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
                              <TableCell>
                                {getStatusBadge(call.status)}
                              </TableCell>
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
                              setCurrentPage((prev) => Math.max(1, prev - 1))
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
                                  currentPage <= 3
                                    ? i + 1
                                    : currentPage - 2 + i;
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
                                    onClick={() => setCurrentPage(pageNum)}
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
                              setCurrentPage((prev) =>
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
      </div>
    </div>
  );
};

export default CallJournal;
