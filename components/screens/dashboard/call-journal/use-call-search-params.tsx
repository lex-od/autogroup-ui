import { useCallback, useMemo, useState } from 'react';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { DateRange } from 'react-day-picker';
import { endOfDay } from 'date-fns';
import { useDebounceCallback } from 'usehooks-ts';
import { CallType } from '@/services/api/calls-api';

const useCallSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlCurrentPage = searchParams.get('page');
  const urlDateFrom = searchParams.get('from');
  const urlDateTo = searchParams.get('to');
  const urlCallType = searchParams.get('type') as CallType | null;
  const urlSearch = searchParams.get('search');

  const [search, setSearch] = useState(urlSearch || '');

  const currentPage = urlCurrentPage ? Number(urlCurrentPage) : 1;
  const callType = urlCallType || 'all';
  const isFiltersSet = !!(urlDateFrom || urlDateTo || urlCallType || urlSearch);

  const dateRange = useMemo(() => {
    if (!urlDateFrom || !urlDateTo) {
      return undefined;
    }
    return {
      from: new Date(urlDateFrom),
      to: new Date(urlDateTo),
    };
  }, [urlDateFrom, urlDateTo]);

  const setCurrentPageToUrl = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);

      if (page > 1) {
        params.set('page', String(page));
      } else {
        params.delete('page');
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  const setDateRangeToUrl = useCallback(
    (range?: DateRange) => {
      const params = new URLSearchParams(searchParams);

      if (range?.from && range?.to) {
        params.set('from', range.from.toISOString());
        params.set('to', endOfDay(range.to).toISOString());
      } else {
        params.delete('from');
        params.delete('to');
      }
      params.delete('page');
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  const setCallTypeToUrl = useCallback(
    (type: string) => {
      const params = new URLSearchParams(searchParams);

      if (type !== 'all') {
        params.set('type', type);
      } else {
        params.delete('type');
      }
      params.delete('page');
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

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

  return {
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
  };
};

export default useCallSearchParams;
