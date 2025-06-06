import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

export type AuthStore = {
  token: string | null;
  _hasHydrated: boolean;

  setToken: (token: string) => void;
  unsetToken: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const createAuthStore = () => {
  return createStore<AuthStore>()(
    persist(
      (set) => ({
        token: null,
        _hasHydrated: false,

        setToken: (token) => {
          set({ token });
        },
        unsetToken: () => {
          set({ token: null });
        },
        setHasHydrated: (value) => {
          set({ _hasHydrated: value });
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
          return () => state.setHasHydrated(true);
        },
      },
    ),
  );
};
