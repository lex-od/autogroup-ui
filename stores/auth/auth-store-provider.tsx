'use client';

import {
  createContext,
  useRef,
  useContext,
  FC,
  PropsWithChildren,
} from 'react';
import { useStore } from 'zustand';

import { type AuthStore, createAuthStore } from '@/stores/auth/auth-store';

type AuthStoreApi = ReturnType<typeof createAuthStore>;

const AuthStoreContext = createContext<AuthStoreApi | undefined>(undefined);

const AuthStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<AuthStoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createAuthStore();
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
