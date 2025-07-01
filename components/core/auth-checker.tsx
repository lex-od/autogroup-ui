'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { supabase } from '@/lib/supabase-config';
import { useAuthStore } from '@/stores/auth/auth-store-provider';

const AuthChecker: FC<PropsWithChildren> = ({ children }) => {
  const setSession = useAuthStore((state) => state.setSession);
  const unsetAuthLoading = useAuthStore((state) => state.unsetAuthLoading);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      unsetAuthLoading();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      unsetAuthLoading();
    });

    return () => subscription.unsubscribe();
  }, [setSession, unsetAuthLoading]);

  return children;
};

export default AuthChecker;
