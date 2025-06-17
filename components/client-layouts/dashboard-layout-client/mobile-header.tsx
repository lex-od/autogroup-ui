'use client';

import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserInfo from '@/components/ui/user-info';
import { useAuthStore } from '@/stores/auth/auth-store-provider';

interface MobileHeaderProps {
  title?: string;
  subtitle?: string;
  totalCalls?: number;
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

const MobileHeader = ({ 
  title = "AUTOGROUP - Аналитика звонков",
  subtitle,
  totalCalls = 0,
  onMobileMenuToggle,
  isMobileMenuOpen = false
}: MobileHeaderProps) => {
  const unsetToken = useAuthStore((state) => state.unsetToken);

  const handleLogout = () => {
    unsetToken();
  };

  return (
    <div className="w-full bg-background border-b lg:hidden">
      <div className="p-4">
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
            
            {/* Только заголовок */}
            <h1 className="text-base font-bold truncate">Речевая аналитика</h1>
          </div>

          {/* Правая часть - информация о пользователе */}
          <div className="flex items-center">
            <UserInfo compact={true} onLogout={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader; 