import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { DateRange } from 'react-day-picker';
import { useDebounceCallback } from 'usehooks-ts';
import { CallType } from '@/services/api/calls.api';

const useCallSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initParams = useMemo(() => {
    const page = searchParams.get('page');
    const currentPage = page ? Number(page) : 1;

    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const dateRange =
      from && to ? { from: new Date(from), to: new Date(to) } : undefined;

    const type = searchParams.get('type');
    const callType = (type || 'all') as CallType | 'all';

    return {
      currentPage,
      dateRange,
      callType,
    };
  }, [searchParams]);

  const urlSearch = searchParams.get('search');

  const [currentPage, setCurrentPage] = useState(initParams.currentPage);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initParams.dateRange,
  );
  const [callType, setCallType] = useState(initParams.callType);
  const [search, setSearch] = useState(urlSearch || '');
  const isFirstRender = useRef(true);

  const isFiltersSet = !!(
    dateRange?.from ||
    dateRange?.to ||
    callType !== 'all' ||
    urlSearch
  );

  const setDateRangeWithPage = useCallback((newDateRange?: DateRange) => {
    setDateRange(newDateRange);
    setCurrentPage(1);
  }, []);

  const setCallTypeWithPage = useCallback((newCallType: string) => {
    setCallType(newCallType as CallType | 'all');
    setCurrentPage(1);
  }, []);

  const setSearchToUrl = useCallback(
    (search: string, searchParams: ReadonlyURLSearchParams) => {
      const params = new URLSearchParams(searchParams);

      if (search) {
        params.set('search', search);
      } else {
        params.delete('search');
      }
      params.delete('page');
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router],
  );

  const setSearchToUrlDebounced = useDebounceCallback(setSearchToUrl, 400);

  const handleSearchChange = useCallback(
    (search: string) => {
      setSearch(search);

      if (search.length !== 1) {
        setSearchToUrlDebounced(search, searchParams);
      } else {
        setSearchToUrlDebounced.cancel();
      }
    },
    [searchParams, setSearchToUrlDebounced],
  );

  const unsetAllFilters = useCallback(() => {
    setSearch('');
    setSearchToUrlDebounced.cancel();

    const params = new URLSearchParams(searchParams);
    params.delete('from');
    params.delete('to');
    params.delete('type');
    params.delete('search');
    params.delete('page');
    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams, setSearchToUrlDebounced]);

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

    router.replace(`${pathname}?${params}`);
  }, [router, pathname, currentPage, dateRange, callType]);

  return {
    urlSearch,
    search,
    currentPage,
    callType,
    isFiltersSet,
    dateRange,
    setCurrentPage,
    setDateRangeWithPage,
    setCallTypeWithPage,
    handleSearchChange,
    unsetAllFilters,
  };
};

export default useCallSearchParams;
