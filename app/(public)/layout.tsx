import { FC, PropsWithChildren } from 'react';
import PublicAccess from '@/components/core/public-access';

const PublicLayout: FC<PropsWithChildren> = ({ children }) => {
  return <PublicAccess>{children}</PublicAccess>;
};

export default PublicLayout;
