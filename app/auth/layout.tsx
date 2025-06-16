import { FC, PropsWithChildren } from 'react';
import AuthLayoutClient from '@/components/client-layouts/auth-layout-client';
import PublicAccess from '@/components/core/public-access';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PublicAccess isProtected>
      <AuthLayoutClient>{children}</AuthLayoutClient>
    </PublicAccess>
  );
};

export default AuthLayout;
