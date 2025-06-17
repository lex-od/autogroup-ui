'use client';

import { useState } from 'react';
import { CalendarDays, Download, Filter, LogOut, Menu, X, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/stores/auth/auth-store-provider';

interface FilterObject {
  dateRange?: { from: Date; to: Date };
  managers?: string[];
  statuses?: string[];
  sentiments?: string[];
}

interface MobileHeaderProps {
  title?: string;
  subtitle?: string;
  totalCalls?: number;
  onFilterChange?: (filters: FilterObject) => void;
  onExport?: () => void;
  isExporting?: boolean;
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

const MobileHeader = ({ 
  title = "AI Call Analytics",
  subtitle,
  totalCalls = 0,
  onFilterChange,
  onExport,
  isExporting = false,
  onMobileMenuToggle,
  isMobileMenuOpen = false
}: MobileHeaderProps) => {
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
      day: '2-digit',
      month: '2-digit',
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
    <div className="w-full bg-background border-b lg:hidden">
      <div className="px-3 py-2">
        {/* Компактный мобильный хедер */}
        <div className="flex items-center justify-between">
          {/* Левая часть */}
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            {/* Кнопка мобильного меню */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onMobileMenuToggle}
              className="flex-shrink-0 h-8 w-8 p-0"
              data-menu-button
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
            
            {/* Заголовок и badge */}
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <h1 className="text-lg font-bold truncate">CallInsight</h1>
              <Badge variant="secondary" className="text-xs">
                {totalCalls}
              </Badge>
            </div>
          </div>

          {/* Правая часть - основные действия */}
          <div className="flex items-center space-x-1">
            {/* Фильтры */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="relative h-8 w-8 p-0"
            >
              <Filter className="h-4 w-4" />
              {getActiveFiltersCount() > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-3 w-3 p-0 text-xs flex items-center justify-center">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </Button>

            {/* Дополнительное меню */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onExport} disabled={isExporting}>
                  <Download className="mr-2 h-4 w-4" />
                  {isExporting ? 'Экспорт...' : 'Экспорт'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Дата */}
        <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1 ml-10">
          <CalendarDays className="h-3 w-3" />
          <span>{subtitle || `Сегодня, ${getCurrentDate()}`}</span>
        </div>

        {/* Панель фильтров */}
        {showFilters && (
          <Card className="mt-3">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium">Фильтры</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-3">
                {/* Период */}
                <div className="space-y-1">
                  <label className="text-xs font-medium">Период</label>
                  <select 
                    className="w-full p-2 border rounded text-xs"
                    value={filters.period}
                    onChange={(e) => handleFilterChange('period', e.target.value)}
                  >
                    <option value="today">Сегодня</option>
                    <option value="week">Неделя</option>
                    <option value="month">Месяц</option>
                    <option value="all">Все время</option>
                  </select>
                </div>

                {/* Статус */}
                <div className="space-y-1">
                  <label className="text-xs font-medium">Статус</label>
                  <select 
                    className="w-full p-2 border rounded text-xs"
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <option value="all">Все статусы</option>
                    <option value="completed">Завершенные</option>
                    <option value="missed">Пропущенные</option>
                    <option value="in-progress">В процессе</option>
                  </select>
                </div>

                {/* Настроение */}
                <div className="space-y-1">
                  <label className="text-xs font-medium">Настроение</label>
                  <select 
                    className="w-full p-2 border rounded text-xs"
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

              {/* Кнопки действий */}
              <div className="flex justify-between items-center mt-4">
                <Button variant="outline" size="sm" onClick={resetFilters} className="text-xs h-7">
                  Сбросить
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setShowFilters(false)} className="text-xs h-7">
                    Отмена
                  </Button>
                  <Button size="sm" onClick={applyFilters} className="text-xs h-7">
                    Применить
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

export default MobileHeader; 