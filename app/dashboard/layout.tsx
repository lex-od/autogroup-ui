import { FC, PropsWithChildren } from 'react';
import PrivateAccess from '@/components/core/private-access';
import DashboardLayoutClient from '@/components/client-layouts/dashboard-layout-client/dashboard-layout-client';

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PrivateAccess>
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
    </PrivateAccess>
  );
};

export default DashboardLayout;
