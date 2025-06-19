'use client';

import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './sidebar';
import Header from './header';
import MobileHeader from './mobile-header';

interface FilterObject {
  dateRange?: { from: Date; to: Date };
  managers?: string[];
  statuses?: string[];
  sentiments?: string[];
}

interface DashboardContextType {
  totalCalls: number;
  onFilterChange: (filters: FilterObject) => void;
  onExport: (format: 'csv' | 'xlsx') => void;
  isExporting: boolean;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const DashboardContext = createContext<DashboardContextType>({
  totalCalls: 0,
  onFilterChange: () => {},
  onExport: () => {},
  isExporting: false,
  isMobileMenuOpen: false,
  toggleMobileMenu: () => {},
});

export const useDashboardContext = () => useContext(DashboardContext);

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

  const handleFilterChange = (filters: FilterObject) => {
    console.log('Filters changed:', filters);
    // Здесь можно передать фильтры дочерним компонентам
  };

  const handleExport = (format: 'csv' | 'xlsx') => {
    setIsExporting(true);
    // Симуляция экспорта
    setTimeout(() => {
      setIsExporting(false);
      console.log(`Export completed in ${format} format`);
    }, 2000);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const contextValue: DashboardContextType = {
    totalCalls,
    onFilterChange: handleFilterChange,
    onExport: handleExport,
    isExporting,
    isMobileMenuOpen,
    toggleMobileMenu,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Сайдбар с поддержкой мобильного меню */}
        <Sidebar
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={closeMobileMenu}
        />

        {/* Основной контент */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Десктопный хедер */}
          <div className="hidden lg:block">
            <Header
              pageTitle={pageTitle}
              totalCalls={totalCalls}
              onExport={handleExport}
              isExporting={isExporting}
              showExportMenu={isCallsJournalPage}
            />
          </div>

          {/* Мобильный хедер */}
          <MobileHeader
            title={pageTitle}
            totalCalls={totalCalls}
            onMobileMenuToggle={toggleMobileMenu}
            isMobileMenuOpen={isMobileMenuOpen}
          />

          {/* Контент страницы */}
          <main className="flex-1 overflow-auto">
            <div className="h-full">{children}</div>
          </main>
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default DashboardLayoutClient;
