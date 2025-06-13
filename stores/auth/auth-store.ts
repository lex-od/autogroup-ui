import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

export type AuthStore = {
  token: string | null;
  hasHydrated: boolean;

  setToken: (token: string) => void;
  unsetToken: () => void;
  _setHasHydrated: (value: boolean) => void;
};

export const createAuthStore = () => {
  return createStore<AuthStore>()(
    persist(
      (set) => ({
        token: null,
        hasHydrated: false,

        setToken: (token) => {
          set({ token });
        },
        unsetToken: () => {
          set({ token: null });
        },
        _setHasHydrated: (value) => {
          set({ hasHydrated: value });
        },
      }),
      {
        name: 'auth-store',
        partialize: ({ token }) => {
          return {
            token,
          };
        },
        onRehydrateStorage: (state) => {
          return () => state._setHasHydrated(true);
        },
      },
    ),
  );
};

export type AuthStoreApi = ReturnType<typeof createAuthStore>;
