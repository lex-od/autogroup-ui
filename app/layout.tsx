import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import AppProviders from '@/components/core/app-providers';
import AuthChecker from '@/components/core/auth-checker';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Autogroup UI',
  description: 'App description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProviders>
          <AuthChecker>{children}</AuthChecker>
        </AppProviders>
      </body>
    </html>
  );
}
