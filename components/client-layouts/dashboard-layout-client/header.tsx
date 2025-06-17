'use client';

import { CalendarDays, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/auth/auth-store-provider';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  totalCalls?: number;
}

const Header = ({ 
  title = "AI Call Analytics",
  subtitle,
  totalCalls = 0
}: HeaderProps) => {
  const unsetToken = useAuthStore((state) => state.unsetToken);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleLogout = () => {
    unsetToken();
  };

  return (
    <div className="w-full bg-background border-b">
      <div className="p-4">
        {/* Компактный хедер */}
        <div className="flex items-center justify-between">
          {/* Левая часть - заголовок и дата */}
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <h1 className="text-xl font-bold tracking-tight truncate">
              {title}
            </h1>
            <Badge variant="secondary" className="text-xs">
              {totalCalls} звонков
            </Badge>
            <div className="hidden lg:flex items-center space-x-1 text-xs text-muted-foreground">
              <CalendarDays className="h-3 w-3" />
              <span className="truncate">
                {subtitle || `Сегодня, ${getCurrentDate()}`}
              </span>
            </div>
          </div>

          {/* Правая часть - только кнопка выхода */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-1 h-8"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Выйти</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 