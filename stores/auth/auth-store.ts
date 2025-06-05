import { createStore } from 'zustand/vanilla';

export type AuthStore = {
  token: string | null;

  setToken: (token: string) => void;
  unsetToken: () => void;
};

export const createAuthStore = () => {
  return createStore<AuthStore>()((set) => ({
    token: null,

    setToken: (token) => {
      set({ token });
    },
    unsetToken: () => {
      set({ token: null });
    },
  }));
};
