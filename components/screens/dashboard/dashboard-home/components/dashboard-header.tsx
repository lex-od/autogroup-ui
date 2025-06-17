'use client';

import { CalendarDays, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DashboardHeaderProps {
  onLogout?: () => void;
  totalCalls?: number;
}

const DashboardHeader = ({ 
  onLogout, 
  totalCalls = 0
}: DashboardHeaderProps) => {
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full">
      {/* Компактный хедер */}
      <div className="flex items-center justify-between p-4">
        {/* Левая часть - заголовок и дата */}
        <div className="flex items-center space-x-3 min-w-0">
          <h1 className="text-xl font-bold tracking-tight">AI Call Analytics</h1>
          <Badge variant="info" className="text-xs">
            {totalCalls} звонков
          </Badge>
          <div className="hidden lg:flex items-center space-x-1 text-xs text-muted-foreground">
            <CalendarDays className="h-3 w-3" />
            <span>Сегодня, {getCurrentDate()}</span>
          </div>
        </div>

        {/* Правая часть - только кнопка выхода */}
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="flex items-center space-x-1 h-8"
          >
            <LogOut className="h-4 w-4" />
            <span>Выйти</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader; 