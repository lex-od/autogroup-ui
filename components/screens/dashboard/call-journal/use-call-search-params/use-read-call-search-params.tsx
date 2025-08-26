import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { DateRange } from 'react-day-picker';
import { CallType } from '@/services/api/calls.api';

const useReadCallSearchParams = () => {
  const searchParams = useSearchParams();

  const rareParams = useMemo(
    () => ({
      page: searchParams.get('page'),
      from: searchParams.get('from'),
      to: searchParams.get('to'),
      type: searchParams.get('type'),
      search: searchParams.get('search'),
    }),
    [searchParams],
  );

  const safeParams = useMemo(() => {
    const { page, from, to, type, search: rareSearch } = rareParams;

    const currentPage = page ? Number(page) : 1;
    const dateRange: DateRange | undefined =
      from && to ? { from: new Date(from), to: new Date(to) } : undefined;
    const callType = (type || 'all') as CallType | 'all';
    const search = rareSearch || '';

    return {
      currentPage,
      dateRange,
      callType,
      search,
    };
  }, [rareParams]);

  return {
    safeParams,
  };
};

export default useReadCallSearchParams;
