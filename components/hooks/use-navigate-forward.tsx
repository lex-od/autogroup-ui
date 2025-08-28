import { useCallback, useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useGlobalStore } from '@/components/core/global-store-provider';

const useNavigateForward = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pushHistoryPoint = useGlobalStore(
    ({ navigation }) => navigation.pushHistoryPoint,
  );

  const currentUrl = `${pathname}?${searchParams}`;

  const currentId = useMemo(() => {
    return Math.random().toString(36).slice(2, 10);
  }, []);

  const pushCurrentHistoryPoint = useCallback(() => {
    pushHistoryPoint({
      id: currentId,
      url: currentUrl,
    });
  }, [pushHistoryPoint, currentId, currentUrl]);

  return {
    currentId,
    pushCurrentHistoryPoint,
  };
};

export default useNavigateForward;
