'use client';

import { useState } from 'react';
import { CalendarDays, Download, Filter, LogOut, Settings, Home, X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAuthStore } from '@/stores/auth/auth-store-provider';

interface FilterObject {
  dateRange?: { from: Date; to: Date };
  managers?: string[];
  statuses?: string[];
  sentiments?: string[];
}

interface HeaderProps {
  title?: string;
  subtitle?: string;
  totalCalls?: number;
  onFilterChange?: (filters: FilterObject) => void;
  onExport?: () => void;
  isExporting?: boolean;
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

const Header = ({ 
  title = "AI Call Analytics",
  subtitle,
  totalCalls = 0,
  onFilterChange,
  onExport,
  isExporting = false,
  onMobileMenuToggle,
  isMobileMenuOpen = false
}: HeaderProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    period: 'today',
    manager: 'all',
    status: 'all',
    sentiment: 'all',
  });

  const unsetToken = useAuthStore((state) => state.unsetToken);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const applyFilters = () => {
    const apiFilters: FilterObject = {};
    
    if (filters.period !== 'all') {
      const now = new Date();
      let fromDate: Date;
      
      switch (filters.period) {
        case 'today':
          fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'quarter':
          fromDate = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
          break;
        default:
          fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      }
      
      apiFilters.dateRange = { from: fromDate, to: now };
    }

    if (filters.manager !== 'all') {
      apiFilters.managers = [filters.manager];
    }

    if (filters.status !== 'all') {
      apiFilters.statuses = [filters.status];
    }

    if (filters.sentiment !== 'all') {
      apiFilters.sentiments = [filters.sentiment];
    }

    onFilterChange?.(apiFilters);
    setShowFilters(false);
  };

  const resetFilters = () => {
    const resetFilters = {
      period: 'today',
      manager: 'all',
      status: 'all',
      sentiment: 'all',
    };
    setFilters(resetFilters);
    onFilterChange?.({});
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== 'all' && value !== 'today').length;
  };

  const handleLogout = () => {
    unsetToken();
  };

  return (
    <div className="w-full bg-background border-b">
      <div className="p-3 lg:p-6">
        {/* Основной хедер */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-4 w-full">
          {/* Левая часть - мобильное меню, заголовок и дата */}
          <div className="space-y-2 min-w-0 flex-1">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <h1 className="text-3xl font-bold tracking-tight truncate">
                  {title}
                </h1>
                <Badge variant="secondary" className="text-xs flex-shrink-0">
                  {totalCalls} звонков
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 flex-shrink-0" />
              <span className="truncate text-sm">
                {subtitle || `Сегодня, ${getCurrentDate()}`}
              </span>
            </div>
          </div>

          {/* Правая часть - действия */}
          <div className="flex items-center space-x-1 lg:space-x-2">
            {/* Фильтры - всегда показываем */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-1 relative flex-shrink-0"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden md:inline">Фильтры</span>
              {getActiveFiltersCount() > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </Button>

            {/* Экспорт - скрываем на очень маленьких экранах */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onExport}
              disabled={isExporting}
              className="hidden xs:flex items-center space-x-1 flex-shrink-0"
            >
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">
                {isExporting ? 'Экспорт...' : 'Экспорт'}
              </span>
            </Button>

            {/* Главная - только на десктопе */}
            <Button variant="ghost" size="sm" className="hidden lg:flex items-center space-x-1 flex-shrink-0">
              <Home className="h-4 w-4" />
              <span>Главная</span>
            </Button>

            {/* Настройки - только на планшете+ */}
            <Button variant="ghost" size="sm" className="hidden sm:flex flex-shrink-0">
              <Settings className="h-4 w-4" />
            </Button>

            {/* Выход */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-1 flex-shrink-0"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Выйти</span>
            </Button>
          </div>
        </div>

        {/* Панель фильтров */}
        {showFilters && (
          <Card className="w-full mt-3">
            <CardContent className="p-4 lg:pt-6 lg:px-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base lg:text-lg font-medium">Фильтры</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {/* Фильтр по дате */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Период</label>
                  <select 
                    className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={filters.period}
                    onChange={(e) => handleFilterChange('period', e.target.value)}
                  >
                    <option value="today">Сегодня</option>
                    <option value="week">Неделя</option>
                    <option value="month">Месяц</option>
                    <option value="quarter">Квартал</option>
                    <option value="all">Все время</option>
                  </select>
                </div>

                {/* Фильтр по менеджерам */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Менеджер</label>
                  <select 
                    className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={filters.manager}
                    onChange={(e) => handleFilterChange('manager', e.target.value)}
                  >
                    <option value="all">Все менеджеры</option>
                    <option value="manager1">Иван Петров</option>
                    <option value="manager2">Анна Смирнова</option>
                    <option value="manager3">Петр Иванов</option>
                    <option value="manager4">Елена Кузнецова</option>
                    <option value="manager5">Сергей Волков</option>
                  </select>
                </div>

                {/* Фильтр по статусу */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Статус звонка</label>
                  <select 
                    className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <option value="all">Все статусы</option>
                    <option value="completed">Завершенные</option>
                    <option value="missed">Пропущенные</option>
                    <option value="in-progress">В процессе</option>
                  </select>
                </div>

                {/* Фильтр по настроению */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Настроение</label>
                  <select 
                    className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={filters.sentiment}
                    onChange={(e) => handleFilterChange('sentiment', e.target.value)}
                  >
                    <option value="all">Любое</option>
                    <option value="positive">Позитивное</option>
                    <option value="neutral">Нейтральное</option>
                    <option value="negative">Негативное</option>
                  </select>
                </div>
              </div>

              {/* Кнопки действий для фильтров */}
              <div className="flex justify-between items-center mt-6">
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Сбросить все
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setShowFilters(false)}>
                    Отмена
                  </Button>
                  <Button size="sm" onClick={applyFilters}>
                    Применить фильтры
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Header; 