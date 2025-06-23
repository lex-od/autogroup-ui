'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useIsAuthSelector } from '@/stores/auth/auth-selectors';
import { useAuthStore } from '@/stores/auth/auth-store-provider';

type Props = {
  isProtected?: boolean;
};

const redirectPath = '/dashboard';

const PublicAccess: FC<PropsWithChildren<Props>> = ({
  children,
  isProtected,
}) => {
  const router = useRouter();
  const isAuthenticated = useIsAuthSelector();
  const authLoading = useAuthStore((state) => state.authLoading);

  useEffect(() => {
    if (isProtected && !authLoading && isAuthenticated) {
      router.replace(redirectPath);
    }
  }, [isProtected, authLoading, isAuthenticated, router]);

  if (isProtected && (authLoading || isAuthenticated)) {
    return null;
  }

  return children;
};

export default PublicAccess;
