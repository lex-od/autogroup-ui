'use client';

import { useState } from 'react';
import {
  Filter,
  Phone,
  User,
  Clock,
  Calendar,
  Trash2,
  ChevronDown,
  FunnelX,
  Plus,
  Upload,
  Search,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Settings,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown as ChevronDownIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDeleteCalls } from '@/services/api/queries/calls.queries';
import { useCallsQuery, useCallStatsQuery } from '@/services/api/calls-api';
import CallJournalFilters from './call-journal-filters/call-journal-filters';
import CallTable from './call-table/call-table';
import CallSearchInput from './call-search-input';
import useCallSearchParams from './use-call-search-params';
import Link from 'next/link';
import CallTablePagination from './call-table/call-table-pagination';

// Настройки колонок
const COLUMN_OPTIONS = [
  { id: 'select', label: 'Выбор', defaultVisible: true },
  { id: 'type', label: 'Тип', defaultVisible: true },
  { id: 'client', label: 'Клиент / Телефон', defaultVisible: true },
  { id: 'manager', label: 'Менеджер', defaultVisible: true },
  { id: 'date', label: 'Дата и время', defaultVisible: true },
  { id: 'duration', label: 'Длительность', defaultVisible: true },
  { id: 'status', label: 'Статус', defaultVisible: true },
  { id: 'actions', label: 'Действия', defaultVisible: true },
];

const PAGE_SIZE_OPTIONS = [10, 25, 50];

const CallJournal = () => {
  const [selectedCalls, setSelectedCalls] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  const [visibleColumns, setVisibleColumns] = useState(
    COLUMN_OPTIONS.reduce((acc, col) => {
      acc[col.id] = col.defaultVisible;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const {
    urlCurrentPage,
    urlDateFrom,
    urlDateTo,
    urlCallType,
    urlSearch,
    search,
    currentPage,
    callType,
    isFiltersSet,
    dateRange,
    setCurrentPageToUrl,
    setDateRangeToUrl,
    setCallTypeToUrl,
    handleSearchChange,
    unsetAllFilters,
  } = useCallSearchParams();

  const { data: calls, isPending: callsPending } = useCallsQuery({
    page: urlCurrentPage ? Number(urlCurrentPage) : 1,
    pageSize: pageSize,
    dateFrom: urlDateFrom,
    dateTo: urlDateTo,
    callType: urlCallType,
    search: urlSearch,
  });

  const { data: stats, isPending: statsPending } = useCallStatsQuery();
  const deleteCallsMutation = useDeleteCalls();

  const handleDeleteSelected = async () => {
    if (selectedCalls.length === 0) return;

    try {
      await deleteCallsMutation.mutateAsync(selectedCalls);
      toast.success(`Удалено звонков: ${selectedCalls.length}`);
      setSelectedCalls([]);
    } catch {
      toast.error('Ошибка при удалении звонков');
    }
  };

  // Вычисляем дополнительные статистики
  const completedCalls = calls?.data.filter(call => call.status === 'completed').length || 0;
  const processingCalls = calls?.data.filter(call => call.status === 'processing' || call.status === 'transcribing' || call.status === 'analyzing').length || 0;
  const failedCalls = calls?.data.filter(call => call.status === 'failed').length || 0;

  // Имитация данных для сравнения с прошлыми периодами
  const getComparisonData = (current: number, previous: number) => {
    const diff = current - previous;
    const percentage = previous > 0 ? ((diff / previous) * 100) : 0;
    return {
      diff,
      percentage,
      isPositive: diff >= 0,
    };
  };

  const toggleColumn = (columnId: string) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnId]: !prev[columnId]
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPageToUrl(page);
  };

  return (
    <div className="w-full h-full">
      <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
        {/* Заголовок страницы */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Журнал звонков</h1>
            <p className="text-muted-foreground">
              Управление и анализ телефонных звонков
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/upload-call">
                <Upload className="mr-2 h-4 w-4" />
                Загрузить
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/dashboard/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Аналитика
              </Link>
            </Button>
          </div>
        </div>

        {/* KPI карточки */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Всего звонков</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {statsPending ? '...' : stats?.totalCalls || 0}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className={`h-4 w-4 ${getComparisonData(stats?.totalCalls || 0, 75).isPositive ? 'text-green-600' : 'text-red-600'}`} />
                    <span className={`text-sm ${getComparisonData(stats?.totalCalls || 0, 75).isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      +{getComparisonData(stats?.totalCalls || 0, 75).percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Сегодня</p>
                  <p className="text-2xl font-bold text-green-800">
                    {statsPending ? '...' : stats?.todayCalls || 0}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className={`h-4 w-4 ${getComparisonData(stats?.todayCalls || 0, 3).isPositive ? 'text-green-600' : 'text-red-600'}`} />
                    <span className={`text-sm ${getComparisonData(stats?.todayCalls || 0, 3).isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {getComparisonData(stats?.todayCalls || 0, 3).isPositive ? '+' : ''}{getComparisonData(stats?.todayCalls || 0, 3).percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-600 font-medium">Завершенные</p>
                  <p className="text-2xl font-bold text-emerald-800">
                    {completedCalls}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-emerald-600">
                      {calls?.total ? ((completedCalls / calls.total) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600 font-medium">В обработке</p>
                  <p className="text-2xl font-bold text-yellow-800">
                    {processingCalls}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-yellow-600">
                      {calls?.total ? ((processingCalls / calls.total) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Ошибки</p>
                  <p className="text-2xl font-bold text-red-800">
                    {failedCalls}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-600">
                      {calls?.total ? ((failedCalls / calls.total) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Средняя оценка</p>
                  <p className="text-2xl font-bold text-purple-800">
                    {statsPending ? '...' : (stats?.avgServiceQuality || 0).toFixed(1)}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className={`h-4 w-4 ${getComparisonData(stats?.avgServiceQuality || 0, 3.8).isPositive ? 'text-green-600' : 'text-red-600'}`} />
                    <span className={`text-sm ${getComparisonData(stats?.avgServiceQuality || 0, 3.8).isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {getComparisonData(stats?.avgServiceQuality || 0, 3.8).isPositive ? '+' : ''}{getComparisonData(stats?.avgServiceQuality || 0, 3.8).percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Панель управления */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Поиск */}
              <div className="flex-1 min-w-0">
                <CallSearchInput value={search} onChange={handleSearchChange} />
              </div>

              {/* Настройки отображения */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="shrink-0">
                    <Settings className="mr-2 h-4 w-4" />
                    Настройки
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <span className="text-sm font-medium">Количество строк</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <DropdownMenuItem
                      key={size}
                      onClick={() => setPageSize(size)}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{size} строк</span>
                      {pageSize === size && <CheckCircle className="h-4 w-4" />}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span className="text-sm font-medium">Видимые колонки</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {COLUMN_OPTIONS.map((column) => (
                    <DropdownMenuItem
                      key={column.id}
                      onClick={() => toggleColumn(column.id)}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{column.label}</span>
                      {visibleColumns[column.id] ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Кнопка удаления выбранных */}
              {selectedCalls.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteSelected}
                  disabled={deleteCallsMutation.isPending}
                  className="shrink-0"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Удалить ({selectedCalls.length})
                </Button>
              )}

              {/* Очистить фильтры */}
              {isFiltersSet && (
                <Button
                  variant="secondary"
                  size="sm"
                  title="Очистить все фильтры"
                  onClick={unsetAllFilters}
                  className="shrink-0"
                >
                  <FunnelX className="mr-2 h-4 w-4" />
                  Очистить
                </Button>
              )}

              {/* Кнопка фильтров */}
              <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm" className="shrink-0">
                    <Filter className="mr-2 h-4 w-4" />
                    Фильтры
                    {isFiltersOpen ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDownIcon className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>
            </div>

            {/* Выпадающий блок с фильтрами */}
            <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <CollapsibleContent className="mt-4">
                <CallJournalFilters
                  dateRange={dateRange}
                  onDateRangeChange={setDateRangeToUrl}
                  callType={callType}
                  onCallTypeChange={setCallTypeToUrl}
                />
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Информационная панель */}
        {calls?.data && calls.data.length > 0 && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-800">
                      Показано {calls.data.length} из {calls.total} звонков
                    </span>
                  </div>
                  {urlSearch && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Поиск: "{urlSearch}"
                    </Badge>
                  )}
                  {urlCallType && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Тип: {urlCallType === 'incoming' ? 'Входящие' : 'Исходящие'}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Таблица звонков */}
        <CallTable
          calls={calls}
          callsPending={callsPending}
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPageToUrl}
          selectedCalls={selectedCalls}
          setSelectedCalls={setSelectedCalls}
          visibleColumns={visibleColumns}
        />

        {/* Пагинация */}
        {calls?.data && calls.data.length > 0 && (
          <CallTablePagination
            currentPage={calls.page}
            totalPages={calls.totalPages}
            onCurrentPageChange={handlePageChange}
          />
        )}

        {/* Пустое состояние */}
        {!callsPending && (!calls?.data || calls.data.length === 0) && (
          <Card>
            <CardContent className="p-8 text-center">
              <Phone className="mx-auto mb-3 h-10 w-10 text-muted-foreground opacity-50" />
              <h3 className="text-base font-semibold mb-2">Звонки не найдены</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {urlSearch || isFiltersSet 
                  ? 'Попробуйте изменить критерии поиска или фильтры'
                  : 'Начните с загрузки первого звонка'
                }
              </p>
              <div className="flex items-center justify-center gap-2">
                <Button size="sm" asChild>
                  <Link href="/dashboard/upload-call">
                    <Plus className="mr-2 h-4 w-4" />
                    Загрузить звонок
                  </Link>
                </Button>
                {(urlSearch || isFiltersSet) && (
                  <Button variant="outline" size="sm" onClick={unsetAllFilters}>
                    <FunnelX className="mr-2 h-4 w-4" />
                    Очистить фильтры
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CallJournal;
