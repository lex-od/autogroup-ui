'use client';

import { useState, useEffect } from 'react';
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
  Play,
  Brain,
  MoreVertical,
  Eye,
  Trash2,
  PhoneIncoming,
  PhoneOutgoing,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
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
import { DateRangePicker, type DateRange } from '@/components/ui/date-range-picker';
import { 
  useCalls, 
  useDeleteCall, 
  useDeleteCalls,
  useExportCalls 
} from '@/services/api/queries/calls.queries';
import { Call } from '@/services/api/queries/calls.queries';
import { toast } from 'sonner';
import { useDashboardContext } from '@/components/client-layouts/dashboard-layout-client/dashboard-layout-client';

const CallsJournalScreen = () => {
  const router = useRouter();
  const { setPageTitle, setShowExportMenu, onExport } = useDashboardContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
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

  // Устанавливаем заголовок страницы и показываем меню экспорта при загрузке
  useEffect(() => {
    setPageTitle('Журнал звонков');
    setShowExportMenu(true);
    
    // Очищаем при размонтировании
    return () => {
      setPageTitle('');
      setShowExportMenu(false);
    };
  }, [setPageTitle, setShowExportMenu]);

  // Мутации
  const deleteCallMutation = useDeleteCall();
  const deleteCallsMutation = useDeleteCalls();
  const exportCallsMutation = useExportCalls();

  // Получаем данные звонков
  const { data: callsData, isLoading, refetch } = useCalls({
    limit: pageSize,
    offset: (currentPage - 1) * pageSize,
    search: searchTerm,
    ...filters,
  });

  const calls = callsData?.calls || [];
  const totalCalls = callsData?.total || 0;
  const totalPages = Math.ceil(totalCalls / pageSize);

  // Обновляем данные при изменении фильтров
  useEffect(() => {
    setCurrentPage(1);
    refetch();
  }, [searchTerm, filters, refetch]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleDateRangeChange = (range: DateRange) => {
    setFilters(prev => ({ 
      ...prev, 
      dateFrom: range.from,
      dateTo: range.to
    }));
  };

  const handleSelectCall = (callId: string) => {
    setSelectedCalls(prev => 
      prev.includes(callId) 
        ? prev.filter(id => id !== callId)
        : [...prev, callId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCalls.length === calls.length) {
      setSelectedCalls([]);
    } else {
      setSelectedCalls(calls.map(call => call.id));
    }
  };

  const handleViewCall = (callId: string) => {
    router.push(`/dashboard/calls/${callId}`);
  };

  const handleDeleteCall = async (callId: string) => {
    try {
      await deleteCallMutation.mutateAsync(callId);
      toast.success('Звонок успешно удален');
      setSelectedCalls(prev => prev.filter(id => id !== callId));
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

  const getStatusBadge = (status: Call['status']) => {
    const variants = {
      completed: 'default',
      missed: 'destructive', 
      'in-progress': 'secondary',
    } as const;

    const labels = {
      completed: 'Завершен',
      missed: 'Пропущен',
      'in-progress': 'В процессе',
    };

    return (
      <Badge variant={variants[status]} className="text-xs">
        {labels[status]}
      </Badge>
    );
  };

  const getSentimentBadge = (sentiment?: 'positive' | 'negative' | 'neutral') => {
    if (!sentiment) return null;

    const variants = {
      positive: 'default',
      negative: 'destructive',
      neutral: 'secondary',
    } as const;

    const labels = {
      positive: 'Позитивный',
      negative: 'Негативный',
      neutral: 'Нейтральный',
    };

    return (
      <Badge variant={variants[sentiment]} className="text-xs">
        {labels[sentiment]}
      </Badge>
    );
  };

  const getCallTypeIcon = (type: Call['type']) => {
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
    <div className="w-full h-full">
      <div className="p-4 lg:p-6 space-y-4 max-w-full mx-auto">
        {/* Компактные KPI карточки */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-card/50">
            <CardContent className="p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Всего звонков</p>
                  <p className="text-base font-bold">{totalCalls}</p>
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
                  <p className="text-base font-bold">
                    {calls.filter(call => {
                      const today = new Date().toDateString();
                      return new Date(call.date).toDateString() === today;
                    }).length}
                  </p>
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
                  <p className="text-base font-bold">
                    {calls.filter(call => call.status === 'completed').length}
                  </p>
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
                  <p className="text-base font-bold">
                    {calls.filter(call => call.status === 'missed').length}
                  </p>
                </div>
                <Clock className="h-3 w-3 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Поиск и компактная кнопка фильтров */}
        <div className="flex items-center space-x-3">
          {/* Поиск */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по номеру телефона, имени клиента или менеджеру..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Компактная кнопка фильтров */}
          <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <CollapsibleTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-3 shrink-0">
              <Filter className="h-4 w-4 mr-2" />
              Фильтры
              <ChevronDown className="h-4 w-4 ml-2" />
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
              <Trash2 className="h-4 w-4 mr-1" />
              Удалить ({selectedCalls.length})
            </Button>
          )}
        </div>

        {/* Выпадающий блок с фильтрами */}
        <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <CollapsibleContent>
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Период дат - двойной календарь */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Период</label>
                    <DateRangePicker
                      value={{
                        from: filters.dateFrom,
                        to: filters.dateTo
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
                      className="w-full p-2 border rounded-md text-sm bg-background"
                      value={filters.status}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
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
                      className="w-full p-2 border rounded-md text-sm bg-background"
                      value={filters.type}
                      onChange={(e) => handleFilterChange('type', e.target.value)}
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
                      className="w-full p-2 border rounded-md text-sm bg-background"
                      value={filters.sentiment}
                      onChange={(e) => handleFilterChange('sentiment', e.target.value)}
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
                      className="w-full p-2 border rounded-md text-sm bg-background"
                      value={filters.manager}
                      onChange={(e) => handleFilterChange('manager', e.target.value)}
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
            {isLoading ? (
              <div className="space-y-3 p-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-3 rounded-lg animate-pulse">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : calls.length > 0 ? (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b">
                        <TableHead className="w-12">
                          <input
                            type="checkbox"
                            checked={selectedCalls.length === calls.length && calls.length > 0}
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
                        <TableHead>AI Анализ</TableHead>
                        <TableHead className="w-16">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {calls.map((call) => (
                        <TableRow 
                          key={call.id}
                          className="hover:bg-muted/50 cursor-pointer border-b border-border/40"
                          onClick={() => handleViewCall(call.id)}
                        >
                          <TableCell onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={selectedCalls.includes(call.id)}
                              onChange={() => handleSelectCall(call.id)}
                              className="rounded"
                            />
                          </TableCell>
                          <TableCell>
                            {getCallTypeIcon(call.type)}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{call.clientName || 'Неизвестно'}</p>
                              <p className="text-xs text-muted-foreground">{call.phoneNumber}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <User className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{call.managerName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{formatDate(call.date)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{formatDuration(call.duration)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {getStatusBadge(call.status)}
                              {call.aiAnalysis?.sentiment && getSentimentBadge(call.aiAnalysis.sentiment)}
                            </div>
                          </TableCell>
                          <TableCell>
                            {call.aiAnalysis ? (
                              <Badge variant="default" className="text-xs">
                                <Brain className="h-3 w-3 mr-1" />
                                Готов
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs">
                                Ожидает
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewCall(call.id)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Просмотр
                                </DropdownMenuItem>
                                {call.recordingUrl && (
                                  <DropdownMenuItem>
                                    <Play className="h-4 w-4 mr-2" />
                                    Прослушать
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteCall(call.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
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
                  <div className="flex items-center justify-between p-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Страница {currentPage} из {totalPages}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Назад
                      </Button>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                          if (pageNum > totalPages) return null;
                          return (
                            <Button
                              key={pageNum}
                              variant={currentPage === pageNum ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(pageNum)}
                              className="w-8 h-8 p-0"
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Вперед
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Phone className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Звонки не найдены</p>
                <p className="text-sm">Попробуйте изменить критерии поиска</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CallsJournalScreen; 