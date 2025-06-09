'use client';

import {
  createContext,
  useRef,
  useContext,
  FC,
  PropsWithChildren,
} from 'react';
import { useStore } from 'zustand';
import { QueryClient } from '@tanstack/react-query';

import {
  type AuthStore,
  type AuthStoreApi,
  createAuthStore,
} from '@/stores/auth/auth-store';
import { setupAxiosInterceptors } from '@/lib/axios-config';

// Context
const AuthStoreContext = createContext<AuthStoreApi | undefined>(undefined);

// Component

interface Props {
  queryClient: QueryClient;
}

const AuthStoreProvider: FC<PropsWithChildren<Props>> = ({
  children,
  queryClient,
}) => {
  const storeRef = useRef<AuthStoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createAuthStore();
    setupAxiosInterceptors(storeRef.current, queryClient);
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export default AuthStoreProvider;

// Hook

export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error(`useAuthStore must be used within AuthStoreProvider`);
  }

  return useStore(authStoreContext, selector);
};
