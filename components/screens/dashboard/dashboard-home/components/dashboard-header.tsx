'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CalendarDays, Download, Filter, LogOut, Settings, Home, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// Типы для фильтров
export interface DateRange {
  from: Date;
  to: Date;
}

export interface DashboardFilters {
  dateRange: DateRange;
  managers: string[];
  callTypes: ('incoming' | 'outgoing')[];
  sentiments: ('positive' | 'negative' | 'neutral')[];
  statuses: ('completed' | 'missed' | 'in-progress')[];
}

interface DashboardHeaderProps {
  onFilterChange?: (filters: Partial<DashboardFilters>) => void;
  onExport?: () => void;
  onLogout?: () => void;
  totalCalls?: number;
  isExporting?: boolean;
}

const DashboardHeader = ({ 
  onFilterChange, 
  onExport, 
  onLogout, 
  totalCalls = 0,
  isExporting = false
}: DashboardHeaderProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<{
    period: string;
    manager: string;
    status: string;
    sentiment: string;
  }>({
    period: 'today',
    manager: 'all',
    status: 'all',
    sentiment: 'all',
  });

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
    // Конвертируем фильтры в формат для API
    const apiFilters: Partial<DashboardFilters> = {};
    
    // Добавляем дату
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
      
      apiFilters.dateRange = {
        from: fromDate,
        to: now,
      };
    }

    // Добавляем менеджеров
    if (filters.manager !== 'all') {
      apiFilters.managers = [filters.manager];
    }

    // Добавляем статусы
    if (filters.status !== 'all') {
      apiFilters.statuses = [filters.status as 'completed' | 'missed' | 'in-progress'];
    }

    // Добавляем настроения
    if (filters.sentiment !== 'all') {
      apiFilters.sentiments = [filters.sentiment as 'positive' | 'negative' | 'neutral'];
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

  return (
    <div className="space-y-4 w-full">
      {/* Основной хедер */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full">
        {/* Левая часть - заголовок и дата */}
        <div className="space-y-1 min-w-0">
          <div className="flex items-center space-x-3 flex-wrap">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">AI Call Analytics</h1>
            <Badge variant="info" className="text-xs flex-shrink-0">
              {totalCalls} звонков
            </Badge>
          </div>
          <p className="text-muted-foreground flex items-center space-x-2 text-sm">
            <CalendarDays className="h-4 w-4 flex-shrink-0" />
            <span>Сегодня, {getCurrentDate()}</span>
          </p>
        </div>

        {/* Правая часть - навигация и действия */}
        <div className="flex items-center space-x-2 flex-wrap">
          {/* Навигация */}
          <Button variant="ghost" size="sm" asChild className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-1">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Главная</span>
            </Link>
          </Button>

          {/* Фильтры */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-1 relative flex-shrink-0"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Фильтры</span>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-xs">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>

          {/* Экспорт */}
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            disabled={isExporting}
            className="flex items-center space-x-1 flex-shrink-0"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">
              {isExporting ? 'Экспорт...' : 'Экспорт'}
            </span>
          </Button>

          {/* Настройки */}
          <Button variant="ghost" size="sm" className="flex-shrink-0">
            <Settings className="h-4 w-4" />
          </Button>

          {/* Выход */}
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="flex items-center space-x-1 flex-shrink-0"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Выйти</span>
          </Button>
        </div>
      </div>

      {/* Панель фильтров */}
      {showFilters && (
        <Card className="w-full">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Фильтры</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
  );
};

export default DashboardHeader; 