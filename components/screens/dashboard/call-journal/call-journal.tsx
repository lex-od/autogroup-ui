'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Filter,
  Phone,
  User,
  Clock,
  Calendar,
  Trash2,
  ChevronDown,
} from 'lucide-react';
import { toast } from 'sonner';
import { DateRange } from 'react-day-picker';
import { endOfDay } from 'date-fns';
import { useDebounceValue } from 'usehooks-ts';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useDeleteCalls } from '@/services/api/queries/calls.queries';
import { CallType, useCallsQuery } from '@/services/api/calls-api';
import CallJournalFilters from './call-journal-filters/call-journal-filters';
import CallTable from './call-table/call-table';
import CallSearchInput from './call-search-input';

const CallJournal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlDateFrom = searchParams.get('from');
  const urlDateTo = searchParams.get('to');
  const urlCallType = searchParams.get('type') as CallType | null;
  const urlSearch = searchParams.get('search');

  const [search, setSearch] = useState(urlSearch || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCalls, setSelectedCalls] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const isFirstRender = useRef(true);
  const [debouncedSearch] = useDebounceValue(search, 400);

  const { data: calls, isPending: callsPending } = useCallsQuery({
    dateFrom: urlDateFrom,
    dateTo: urlDateTo,
    callType: urlCallType,
    search: urlSearch,
  });
  const deleteCallsMutation = useDeleteCalls();

  const dateRange = useMemo(() => {
    if (!urlDateFrom || !urlDateTo) {
      return undefined;
    }
    return {
      from: new Date(urlDateFrom),
      to: new Date(urlDateTo),
    };
  }, [urlDateFrom, urlDateTo]);

  const callType = urlCallType || 'all';

  const setDateRangeToUrl = (range?: DateRange) => {
    const params = new URLSearchParams(searchParams);

    if (range?.from && range?.to) {
      params.set('from', range.from.toISOString());
      params.set('to', endOfDay(range.to).toISOString());
    } else {
      params.delete('from');
      params.delete('to');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const setCallTypeToUrl = (type: string) => {
    const params = new URLSearchParams(searchParams);

    if (type !== 'all') {
      params.set('type', type);
    } else {
      params.delete('type');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const setSearchToUrl = (search: string) => {
    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (debouncedSearch.length !== 1) {
      setSearchToUrl(debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

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

  return (
    <div className="h-full w-full">
      <div className="mx-auto max-w-full space-y-4 p-4 lg:p-6">
        {/* Компактные KPI карточки */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Card className="bg-card/50 py-4">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Всего звонков</p>
                  <p className="text-base font-bold">[no-data]</p>
                </div>
                <Phone className="h-3 w-3 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 py-4">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Сегодня</p>
                  <p className="text-base font-bold">[no-data]</p>
                </div>
                <Calendar className="h-3 w-3 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 py-4">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Завершенные</p>
                  <p className="text-base font-bold">[no-data]</p>
                </div>
                <User className="h-3 w-3 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 py-4">
            <CardContent>
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
          <CallSearchInput value={search} onChange={setSearch} />

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
            <CallJournalFilters
              dateRange={dateRange}
              onDateRangeChange={setDateRangeToUrl}
              callType={callType}
              onCallTypeChange={setCallTypeToUrl}
            />
          </CollapsibleContent>
        </Collapsible>

        {/* Таблица звонков */}
        <CallTable
          calls={calls}
          pending={callsPending}
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          selectedCalls={selectedCalls}
          setSelectedCalls={setSelectedCalls}
        />
      </div>
    </div>
  );
};

export default CallJournal;
