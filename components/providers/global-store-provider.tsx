'use client';

import {
  createContext,
  useRef,
  useContext,
  type FC,
  type PropsWithChildren,
} from 'react';
import { useStore } from 'zustand';

import { type GlobalStore, createGlobalStore } from '@/store/global-store';

type GlobalStoreApi = ReturnType<typeof createGlobalStore>;

const GlobalStoreContext = createContext<GlobalStoreApi | undefined>(undefined);

const GlobalStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<GlobalStoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createGlobalStore();
  }

  return (
    <GlobalStoreContext.Provider value={storeRef.current}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

export default GlobalStoreProvider;

// Hook

export const useGlobalStore = <T,>(selector: (store: GlobalStore) => T): T => {
  const globalStoreContext = useContext(GlobalStoreContext);

  if (!globalStoreContext) {
    throw new Error(`useGlobalStore must be used within GlobalStoreProvider`);
  }

  return useStore(globalStoreContext, selector);
};
