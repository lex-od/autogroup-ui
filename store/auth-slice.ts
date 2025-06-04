import { StateCreator } from 'zustand';
import { type GlobalStore } from './global-store';

export type AuthSlice = {
  auth: {
    token: string | null;

    setToken: (token: string) => void;
    unsetToken: () => void;
  };
};

export const createAuthSlice: StateCreator<GlobalStore, [], [], AuthSlice> = (
  set,
): AuthSlice => ({
  auth: {
    token: null,

    setToken: (token) => {
      set((state) => ({ auth: { ...state.auth, token } }));
    },
    unsetToken: () => {
      set((state) => ({ auth: { ...state.auth, token: null } }));
    },
  },
});
