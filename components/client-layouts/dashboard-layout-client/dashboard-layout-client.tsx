'use client';

import { FC, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import DashboardSidebar from './dashboard-sidebar';
import DashboardHeader from './dashboard-header';
import DashboardHeaderMobile from './dashboard-header-mobile';

const DashboardLayoutClient: FC<PropsWithChildren> = ({ children }) => {
  const [totalCalls] = useState(248);
  const [isExporting, setIsExporting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isCallsJournalPage = pathname === '/dashboard/calls';

  const pageTitle = useMemo(() => {
    const isDashboardHomePage = pathname === '/dashboard';
    const isCallsJournalSection = pathname.startsWith('/dashboard/calls');

    if (isDashboardHomePage) {
      return 'AUTOGROUP - Аналитика звонков';
    }
    if (isCallsJournalSection) {
      return 'Журнал звонков';
    }
    return 'AUTOGROUP - Аналитика звонков';
  }, [pathname]);

  const handleExport = useCallback((format: 'csv' | 'xlsx') => {
    setIsExporting(true);
    // Симуляция экспорта
    setTimeout(() => {
      setIsExporting(false);
      console.log(`Export completed in ${format} format`);
    }, 2000);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((state) => !state);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar with mobile menu */}
      <DashboardSidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={closeMobileMenu}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="hidden lg:block">
          <DashboardHeader
            pageTitle={pageTitle}
            totalCalls={totalCalls}
            onExport={handleExport}
            isExporting={isExporting}
            showExportMenu={isCallsJournalPage}
          />
        </div>

        <DashboardHeaderMobile
          pageTitle={pageTitle}
          onMobileMenuToggle={toggleMobileMenu}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayoutClient;
