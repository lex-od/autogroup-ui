import { useAuthStore } from './auth-store-provider';

export const useAuthSelector = () => {
  const isAuthenticated = useAuthStore((state) => !!state.session);
  const authLoading = useAuthStore((state) => state.authLoading);

  return {
    isAuthenticated,
    authLoading,
  };
};
