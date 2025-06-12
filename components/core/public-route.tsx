'use client';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth/auth-store-provider';

type Props = {
  isProtected?: boolean;
};

const redirectPath = '/dashboard';

const PublicRoute: FC<PropsWithChildren<Props>> = ({
  children,
  isProtected,
}) => {
  const router = useRouter();
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const isAuthenticated = useAuthStore((state) => !!state.token);

  useEffect(() => {
    if (isProtected && hasHydrated && isAuthenticated) {
      router.replace(redirectPath);
    }
  }, [isProtected, hasHydrated, isAuthenticated, router]);

  if (isProtected && (!hasHydrated || isAuthenticated)) {
    return null;
  }

  return children;
};

export default PublicRoute;
