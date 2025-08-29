'use client';

import { FC, PropsWithChildren, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import AuthStoreProvider from '@/stores/auth/auth-store-provider';
import GlobalStoreProvider from '@/components/core/global-store-provider';

const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  const queryClientRef = useRef<QueryClient>(null);

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 120 * 1000, // 2 minutes
          retry: false,
        },
      },
    });
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <AuthStoreProvider
      // queryClient={queryClientRef.current}
      >
        <GlobalStoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </GlobalStoreProvider>
      </AuthStoreProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default AppProviders;
