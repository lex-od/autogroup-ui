'use client';

import { FC, PropsWithChildren } from 'react';

const DashboardLayoutClient: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <header>dashboard header</header>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayoutClient;
