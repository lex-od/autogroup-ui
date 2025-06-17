'use client';

import { CalendarDays } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import UserInfo from '@/components/ui/user-info';
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
      <div className="px-4 py-3">
        {/* Компактный хедер с точной высотой 32px */}
        <div className="flex items-center justify-between h-8">
          {/* Левая часть - заголовок и дата */}
          <div className="flex items-center space-x-3 min-w-0 flex-1 h-full">
            <h1 className="text-base font-semibold tracking-tight truncate leading-none">
              {title}
            </h1>
            <Badge variant="secondary" className="text-xs h-5 px-2 py-0.5 flex items-center">
              {totalCalls} звонков
            </Badge>
            <div className="hidden lg:flex items-center space-x-1 text-xs text-muted-foreground h-full">
              <CalendarDays className="h-4 w-4" />
              <span className="truncate leading-none">
                {subtitle || `Сегодня, ${getCurrentDate()}`}
              </span>
            </div>
          </div>

          {/* Правая часть - информация о пользователе */}
          <div className="flex items-center h-full">
            <UserInfo compact={false} onLogout={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 