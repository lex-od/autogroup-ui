import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';
import {
  createNavigationSlice,
  type HistoryPoint,
  type NavigationSlice,
} from './navigation.slice';

export type GlobalStore = NavigationSlice;

type PersistedState = {
  navigation: {
    history: HistoryPoint[];
  };
};

export const createGlobalStore = () => {
  return createStore<GlobalStore>()(
    persist(
      (...args) => ({
        ...createNavigationSlice(...args),
      }),
      // Persist options
      {
        name: 'global.store',
        partialize: ({ navigation }): PersistedState => ({
          navigation: {
            history: navigation.history,
          },
        }),
        merge: (persisted, current) => {
          const typedPersisted = persisted as PersistedState;

          return {
            ...current,
            navigation: {
              ...current.navigation,
              ...typedPersisted.navigation,
            },
          };
        },
      },
    ),
  );
};
