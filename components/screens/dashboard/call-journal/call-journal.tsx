'use client';

import { useMemo, useState } from 'react';
import { Filter, Trash2, ChevronDown, FunnelX } from 'lucide-react';
import { endOfDay } from 'date-fns';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useDeleteCalls } from '@/services/api/queries/calls.queries';
import { CallsParams, useCallsQuery } from '@/services/api/calls.api';
import CallJournalFilters from './call-journal-filters/call-journal-filters';
import CallTable from './call-table/call-table';
import CallSearchInput from './call-search-input';
import useCallSearchParams from './use-call-search-params';
import CallStatistics from './call-statistics';

const pageSize = 25;

const CallJournal = () => {
  const {
    currentPage,
    setCurrentPage,
    dateRange,
    setDateRangeWithPage,
    callType,
    setCallTypeWithPage,
    search,
    setSearchWithPage,
    searchDelayed,
    isFiltersSet,
    unsetAllFilters,
  } = useCallSearchParams();

  const [selectedCalls, setSelectedCalls] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const callsParams = useMemo((): CallsParams => {
    return {
      page: currentPage,
      dateFrom: dateRange?.from?.toISOString(),
      dateTo: dateRange?.to ? endOfDay(dateRange.to).toISOString() : null,
      callType: callType === 'all' ? null : callType,
      search: searchDelayed,
      pageSize,
    };
  }, [currentPage, dateRange, callType, searchDelayed]);

  const { data: calls, isPending: callsPending } = useCallsQuery(callsParams);
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

  return (
    <div className="space-y-4 p-4 lg:p-6">
      {/* Компактные KPI карточки */}
      <CallStatistics />

      {/* Поиск и компактная кнопка фильтров */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Поиск */}
        <CallSearchInput value={search} onChange={setSearchWithPage} />

        {/* Кнопка удаления выбранных */}
        {selectedCalls.length > 0 && (
          <Button
            variant="secondary"
            onClick={handleDeleteSelected}
            disabled={deleteCallsMutation.isPending}
          >
            <Trash2 />
            Удалить ({selectedCalls.length})
          </Button>
        )}

        {/* Очистить фильтры и поиск */}
        {isFiltersSet && (
          <Button
            variant="secondary"
            size="icon"
            title="Очистить все"
            onClick={unsetAllFilters}
          >
            <FunnelX />
          </Button>
        )}

        {/* Компактная кнопка фильтров */}
        <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <CollapsibleTrigger className="inline-flex h-9 shrink-0 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium whitespace-nowrap shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
            <Filter className="mr-2 h-4 w-4" />
            Фильтры
            <ChevronDown className="ml-2 h-4 w-4" />
          </CollapsibleTrigger>
        </Collapsible>
      </div>

      {/* Выпадающий блок с фильтрами */}
      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <CollapsibleContent>
          <CallJournalFilters
            dateRange={dateRange}
            onDateRangeChange={setDateRangeWithPage}
            callType={callType}
            onCallTypeChange={setCallTypeWithPage}
          />
        </CollapsibleContent>
      </Collapsible>

      {/* Таблица звонков */}
      <CallTable
        calls={calls}
        callsPending={callsPending}
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        pageSize={pageSize}
        selectedCalls={selectedCalls}
        setSelectedCalls={setSelectedCalls}
      />
    </div>
  );
};

export default CallJournal;
