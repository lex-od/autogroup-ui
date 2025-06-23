'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthSelector } from '@/stores/auth/auth-selectors';

const redirectPath = '/auth/login';

const PrivateAccess: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, authLoading } = useAuthSelector();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace(redirectPath);
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || !isAuthenticated) {
    return null;
  }

  return children;
};

export default PrivateAccess;
