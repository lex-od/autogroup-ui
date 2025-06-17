'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Phone, 
  BarChart3, 
  Users, 
  Settings,
  Brain,
  FileText,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isMobileMenuOpen?: boolean;
  onMobileMenuClose?: () => void;
}

const Sidebar = ({ isMobileMenuOpen = false, onMobileMenuClose }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // Закрываем мобильное меню при изменении маршрута
  useEffect(() => {
    if (isMobileMenuOpen && onMobileMenuClose) {
      onMobileMenuClose();
    }
  }, [pathname]);

  // Закрываем мобильное меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('[data-sidebar]') && !target.closest('[data-menu-button]')) {
        onMobileMenuClose?.();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobileMenuOpen, onMobileMenuClose]);

  const navigation = [
    { name: 'Дашборд', href: '/dashboard', icon: LayoutDashboard, current: pathname === '/dashboard' },
    { name: 'Звонки', href: '/dashboard/calls', icon: Phone, current: pathname.startsWith('/dashboard/calls') },
    { name: 'Аналитика', href: '/dashboard/analytics', icon: BarChart3, current: pathname === '/dashboard/analytics' },
    { name: 'Менеджеры', href: '/dashboard/managers', icon: Users, current: pathname === '/dashboard/managers' },
    { name: 'AI Анализ', href: '/dashboard/ai-analysis', icon: Brain, current: pathname === '/dashboard/ai-analysis' },
    { name: 'Отчеты', href: '/dashboard/reports', icon: FileText, current: pathname === '/dashboard/reports' },
    { name: 'Планировщик', href: '/dashboard/scheduler', icon: Calendar, current: pathname === '/dashboard/scheduler' },
  ];

  const secondaryNavigation = [
    { name: 'Настройки', href: '/dashboard/settings', icon: Settings, current: pathname === '/dashboard/settings' },
  ];

  return (
    <>
      {/* Мобильный overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileMenuClose}
        />
      )}

      {/* Десктопный сайдбар */}
      <div 
        data-sidebar
        className={cn(
          "hidden lg:flex flex-col h-full bg-card border-r transition-all duration-300 relative",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Логотип и кнопка сворачивания */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className={cn("flex items-center space-x-2", isCollapsed && "lg:hidden")}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Phone className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">CallInsight</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Навигация */}
        <nav className="flex-1 p-4 space-y-2">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    item.current ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    isCollapsed ? "justify-center px-2" : "justify-start space-x-3"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </div>

          <div className="border-t my-4" />

          <div className="space-y-1">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    item.current ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    isCollapsed ? "justify-center px-2" : "justify-start space-x-3"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Профиль */}
        <div className="p-4 border-t">
          <div className={cn(
            "flex items-center p-2 rounded-lg bg-muted/50",
            isCollapsed ? "justify-center" : "space-x-3"
          )}>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
              А
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Администратор</p>
                <p className="text-xs text-muted-foreground truncate">admin@autogroup.ru</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Мобильный сайдбар */}
      {isMobileMenuOpen && (
        <div 
          data-sidebar
          className="lg:hidden flex flex-col h-full bg-card border-r fixed left-0 top-0 w-72 shadow-xl z-50"
        >
          {/* Логотип */}
          <div className="flex items-center p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Phone className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">CallInsight</span>
            </div>
          </div>

          {/* Навигация */}
          <nav className="flex-1 p-4 space-y-2">
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      item.current ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="border-t my-4" />

            <div className="space-y-1">
              {secondaryNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      item.current ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Профиль */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3 p-2 rounded-lg bg-muted/50">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                А
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Администратор</p>
                <p className="text-xs text-muted-foreground truncate">admin@autogroup.ru</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar; 