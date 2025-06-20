'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC, PropsWithChildren, useRef } from 'react';

import AuthStoreProvider from '@/stores/auth/auth-store-provider';
import GlobalStoreProvider from '@/stores/global/global-store-provider';

const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  const queryClientRef = useRef<QueryClient>(null);

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minute
        },
      },
    });
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <AuthStoreProvider
      // queryClient={queryClientRef.current}
      >
        <GlobalStoreProvider>{children}</GlobalStoreProvider>
      </AuthStoreProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default AppProviders;
