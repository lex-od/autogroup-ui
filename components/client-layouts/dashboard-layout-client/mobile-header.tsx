'use client';

import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth/auth-store-provider';
import UserInfo from './user-info';

interface MobileHeaderProps {
  title?: string;
  subtitle?: string;
  totalCalls?: number;
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

const MobileHeader = ({
  title,
  onMobileMenuToggle,
  isMobileMenuOpen = false,
}: MobileHeaderProps) => {
  const unsetToken = useAuthStore((state) => state.unsetToken);

  const handleLogout = () => {
    unsetToken();
  };

  return (
    <div className="border-b bg-background lg:hidden">
      <div className="px-4 py-3">
        <div className="flex h-8 items-center justify-between">
          {/* Левая часть - меню и заголовок */}
          <div className="flex min-w-0 flex-1 items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMobileMenuToggle}
              className="h-7 w-7 p-0"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
            <h1 className="truncate text-base font-semibold">
              {title || 'AUTOGROUP - Аналитика звонков'}
            </h1>
          </div>

          {/* Правая часть - пользователь */}
          <div className="flex items-center">
            <UserInfo compact={true} onLogout={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
