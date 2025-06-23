'use client';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthSelector } from '@/stores/auth/auth-selectors';

type Props = {
  isProtected?: boolean;
};

const redirectPath = '/dashboard';

const PublicAccess: FC<PropsWithChildren<Props>> = ({
  children,
  isProtected,
}) => {
  const router = useRouter();
  const { isAuthenticated, authLoading } = useAuthSelector();

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
