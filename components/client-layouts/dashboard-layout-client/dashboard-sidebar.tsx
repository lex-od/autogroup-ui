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
  ChevronRight,
  CloudUpload,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
}

const DashboardSidebar = ({
  isMobileMenuOpen = false,
  onMobileMenuClose,
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // Закрываем мобильное меню при изменении маршрута
  useEffect(() => {
    onMobileMenuClose();
  }, [pathname, onMobileMenuClose]);

  // Закрываем мобильное меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        isMobileMenuOpen &&
        !target.closest('[data-sidebar]') &&
        !target.closest('[data-menu-button]')
      ) {
        onMobileMenuClose();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobileMenuOpen, onMobileMenuClose]);

  const navigation = [
    {
      name: 'Дашборд',
      href: '/dashboard',
      icon: LayoutDashboard,
      current: pathname === '/dashboard',
    },
    {
      name: 'Звонки',
      href: '/dashboard/calls',
      icon: Phone,
      current: pathname.startsWith('/dashboard/calls'),
    },
    {
      name: 'Загрузка звонка',
      href: '/dashboard/upload-call',
      icon: CloudUpload,
      current: pathname === '/dashboard/upload-call',
    },
    {
      name: 'Аналитика',
      href: '#',
      icon: BarChart3,
      current: pathname === '/dashboard/analytics',
    },
    {
      name: 'Менеджеры',
      href: '#',
      icon: Users,
      current: pathname === '/dashboard/managers',
    },
    {
      name: 'AI Анализ',
      href: '#',
      icon: Brain,
      current: pathname === '/dashboard/ai-analysis',
    },
    {
      name: 'Отчеты',
      href: '#',
      icon: FileText,
      current: pathname === '/dashboard/reports',
    },
    {
      name: 'Планировщик',
      href: '#',
      icon: Calendar,
      current: pathname === '/dashboard/scheduler',
    },
  ];

  const secondaryNavigation = [
    {
      name: 'Настройки',
      href: '#',
      icon: Settings,
      current: pathname === '/dashboard/settings',
    },
  ];

  return (
    <>
      {/* Мобильный overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onMobileMenuClose}
        />
      )}

      {/* Десктопный сайдбар */}
      <div
        data-sidebar
        className={cn(
          'relative hidden h-full flex-col border-r bg-card transition-all duration-300 lg:flex',
          isCollapsed ? 'w-16' : 'w-64',
        )}
      >
        {/* Логотип и кнопка сворачивания */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div
            className={cn(
              'flex h-8 items-center space-x-2',
              isCollapsed && 'lg:hidden',
            )}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Phone className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-base leading-none font-semibold">
              Речевая аналитика
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Навигация */}
        <nav className="flex-1 space-y-2 p-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex cursor-default items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    item.current
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    isCollapsed
                      ? 'justify-center px-2'
                      : 'justify-start space-x-3',
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </div>

          <div className="my-4 border-t" />

          <div className="space-y-1">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex cursor-default items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    item.current
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    isCollapsed
                      ? 'justify-center px-2'
                      : 'justify-start space-x-3',
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Мобильный сайдбар */}
      {isMobileMenuOpen && (
        <div
          data-sidebar
          className="fixed top-0 left-0 z-50 flex h-full w-72 flex-col border-r bg-card shadow-xl lg:hidden"
        >
          {/* Логотип */}
          <div className="flex items-center border-b px-4 py-3">
            <div className="flex h-8 items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Phone className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-base leading-none font-semibold">
                Речевая аналитика
              </span>
            </div>
          </div>

          {/* Навигация */}
          <nav className="flex-1 space-y-2 p-4">
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      item.current
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="my-4 border-t" />

            <div className="space-y-1">
              {secondaryNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      item.current
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;
