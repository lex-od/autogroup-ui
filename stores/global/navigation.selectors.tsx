import { useGlobalStore } from '@/components/core/global-store-provider';

export const useHistoryPointSelector = (id?: string | null) => {
  return useGlobalStore(({ navigation }) => {
    if (!id) return undefined;
    return navigation.history.find((point) => point.id === id);
  });
};
