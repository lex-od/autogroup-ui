'use client';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth/auth-store-provider';

const redirectPath = '/auth/login';

const PrivateAccess: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const isAuthenticated = useAuthStore((state) => !!state.token);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace(redirectPath);
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated || !isAuthenticated) {
    return null;
  }

  return children;
};

export default PrivateAccess;
