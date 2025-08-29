import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGlobalStore } from '@/components/core/global-store-provider';
import { useHistoryPointSelector } from '@/stores/global/navigation.selectors';

const useNavigateBack = (defaultUrl: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const backHistoryPoint = useHistoryPointSelector(searchParams.get('back_id'));

  const removeHistoryPoint = useGlobalStore(
    ({ navigation }) => navigation.removeHistoryPoint,
  );

  const backUrl = backHistoryPoint?.url || defaultUrl;

  const navigateBack = useCallback(() => {
    if (backHistoryPoint) {
      removeHistoryPoint(backHistoryPoint.id);
    }
    router.push(backUrl);
  }, [backHistoryPoint, removeHistoryPoint, router, backUrl]);

  const removeBackHistoryPoint = useCallback(() => {
    if (backHistoryPoint) {
      removeHistoryPoint(backHistoryPoint.id);
    }
  }, [backHistoryPoint, removeHistoryPoint]);

  return {
    backUrl,
    navigateBack,
    removeBackHistoryPoint,
  };
};

export default useNavigateBack;
