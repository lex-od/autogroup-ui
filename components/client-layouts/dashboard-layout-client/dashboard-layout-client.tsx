'use client';

import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
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
  pageTitle?: string;
  showExportMenu: boolean;
  onFilterChange: (filters: FilterObject) => void;
  onExport: (format: 'csv' | 'xlsx') => void;
  isExporting: boolean;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  setPageTitle: (title: string) => void;
  setShowExportMenu: (show: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType>({
  totalCalls: 0,
  pageTitle: undefined,
  showExportMenu: false,
  onFilterChange: () => {},
  onExport: () => {},
  isExporting: false,
  isMobileMenuOpen: false,
  toggleMobileMenu: () => {},
  setPageTitle: () => {},
  setShowExportMenu: () => {},
});

export const useDashboardContext = () => useContext(DashboardContext);

const DashboardLayoutClient: FC<PropsWithChildren> = ({ children }) => {
  const [totalCalls] = useState(248);
  const [pageTitle, setPageTitle] = useState<string | undefined>();
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    pageTitle,
    showExportMenu,
    onFilterChange: handleFilterChange,
    onExport: handleExport,
    isExporting,
    isMobileMenuOpen,
    toggleMobileMenu,
    setPageTitle,
    setShowExportMenu,
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
              showExportMenu={showExportMenu}
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
