import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { DateRange } from 'react-day-picker';
import { useDebounceCallback } from 'usehooks-ts';
import { CallType } from '@/services/api/calls.api';
import useReadCallSearchParams from './use-read-call-search-params';

const useCallSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { safeParams } = useReadCallSearchParams();

  const [currentPage, setCurrentPage] = useState(safeParams.currentPage);
  const [dateRange, setDateRange] = useState(safeParams.dateRange);
  const [callType, setCallType] = useState(safeParams.callType);
  const [search, setSearch] = useState(safeParams.search);
  const [searchDelayed, setSearchDelayed] = useState(search);

  const isFirstRender = useRef(true);

  const isFiltersSet = !!(
    dateRange?.from ||
    dateRange?.to ||
    callType !== 'all' ||
    searchDelayed
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const params = new URLSearchParams();

    if (currentPage > 1) {
      params.set('page', String(currentPage));
    }
    if (dateRange?.from && dateRange?.to) {
      params.set('from', dateRange.from.toISOString());
      params.set('to', dateRange.to.toISOString());
    }
    if (callType !== 'all') {
      params.set('type', callType);
    }
    if (searchDelayed) {
      params.set('search', searchDelayed);
    }
    router.replace(`${pathname}?${params}`);
  }, [router, pathname, currentPage, dateRange, callType, searchDelayed]);

  const setDateRangeWithPage = useCallback((dateRange?: DateRange) => {
    setDateRange(dateRange);
    setCurrentPage(1);
  }, []);

  const setCallTypeWithPage = useCallback((callType: string) => {
    setCallType(callType as CallType | 'all');
    setCurrentPage(1);
  }, []);

  const setSearchDelayedWithPageDebounce = useDebounceCallback(
    useCallback((search: string) => {
      setSearchDelayed(search);
      setCurrentPage(1);
    }, []),
    400,
  );

  const setSearchWithPage = useCallback(
    (search: string) => {
      setSearch(search);

      if (search.length !== 1) {
        setSearchDelayedWithPageDebounce(search);
      } else {
        setSearchDelayedWithPageDebounce.cancel();
      }
    },
    [setSearchDelayedWithPageDebounce],
  );

  const unsetAllFilters = useCallback(() => {
    setCurrentPage(1);
    setDateRange(undefined);
    setCallType('all');
    setSearch('');
    setSearchDelayed('');
    setSearchDelayedWithPageDebounce.cancel();
  }, [setSearchDelayedWithPageDebounce]);

  return {
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
  };
};

export default useCallSearchParams;
