import { createStore } from 'zustand/vanilla';
import { Session } from '@supabase/supabase-js';

export type AuthStore = {
  session: Session | null;
  authLoading: boolean;

  setSession: (newSession: Session | null) => void;
  unsetAuthLoading: () => void;
};

export const createAuthStore = () => {
  return createStore<AuthStore>()((set) => ({
    session: null,
    authLoading: true,

    setSession: (newSession) => {
      set({ session: newSession });
    },
    unsetAuthLoading: () => {
      set({ authLoading: false });
    },
  }));
};

export type AuthStoreApi = ReturnType<typeof createAuthStore>;
