'use client';

import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';
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
  onExport: () => void;
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

  const handleFilterChange = (filters: FilterObject) => {
    console.log('Filters changed:', filters);
    // Здесь можно передать фильтры дочерним компонентам
  };

  const handleExport = () => {
    setIsExporting(true);
    // Симуляция экспорта
    setTimeout(() => {
      setIsExporting(false);
      console.log('Export completed');
    }, 2000);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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
      <div className="h-screen flex bg-background overflow-hidden">
        {/* Сайдбар с поддержкой мобильного меню */}
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={closeMobileMenu}
        />
        
        {/* Основной контент */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Десктопный хедер */}
          <div className="hidden lg:block">
            <Header
              totalCalls={totalCalls}
              onFilterChange={handleFilterChange}
              onExport={handleExport}
              isExporting={isExporting}
              onMobileMenuToggle={toggleMobileMenu}
              isMobileMenuOpen={isMobileMenuOpen}
            />
          </div>

          {/* Мобильный хедер */}
          <MobileHeader
            totalCalls={totalCalls}
            onFilterChange={handleFilterChange}
            onExport={handleExport}
            isExporting={isExporting}
            onMobileMenuToggle={toggleMobileMenu}
            isMobileMenuOpen={isMobileMenuOpen}
          />
          
          {/* Контент страницы */}
          <main className="flex-1 overflow-auto">
            <div className="h-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default DashboardLayoutClient;
