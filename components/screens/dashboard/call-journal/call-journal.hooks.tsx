import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DateRange } from 'react-day-picker';
import { endOfDay } from 'date-fns';
import { useDebounceValue } from 'usehooks-ts';
import { CallType } from '@/services/api/calls-api';

export const useCallSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get('search');
  const urlDateFrom = searchParams.get('from');
  const urlDateTo = searchParams.get('to');
  const urlCallType = searchParams.get('type') as CallType | null;

  const [search, setSearch] = useState(urlSearch || '');

  const isFirstRender = useRef(true);
  const [debouncedSearch] = useDebounceValue(search, 400);

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

  return {
    urlSearch,
    urlDateFrom,
    urlDateTo,
    urlCallType,
    search,
    setSearch,
    dateRange,
    callType,
    setDateRangeToUrl,
    setCallTypeToUrl,
  };
};
