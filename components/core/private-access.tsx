'use client';

import {
  FC,
  PropsWithChildren,
  // useEffect
} from 'react';
// import { useRouter } from 'next/navigation';
// import { useIsAuthSelector } from '@/stores/auth/auth-selectors';
import { useAuthStore } from '@/stores/auth/auth-store-provider';

// const redirectPath = '/auth/login';

const PrivateAccess: FC<PropsWithChildren> = ({ children }) => {
  // const router = useRouter();
  // const isAuthenticated = useIsAuthSelector();
  const authLoading = useAuthStore((state) => state.authLoading);

  // useEffect(() => {
  //   if (!authLoading && !isAuthenticated) {
  //     router.replace(redirectPath);
  //   }
  // }, [authLoading, isAuthenticated, router]);

  // if (authLoading || !isAuthenticated) {
  //   return null;
  // }
  if (authLoading) {
    return null;
  }

  return children;
};

export default PrivateAccess;
