import { useAuthStore } from './auth-store-provider';

export const useIsAuthSelector = () => {
  return useAuthStore((state) => !!state.session);
};
