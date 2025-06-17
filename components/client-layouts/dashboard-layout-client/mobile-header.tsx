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
  title,
  subtitle,
  totalCalls = 0,
  onMobileMenuToggle,
  isMobileMenuOpen = false,
}: MobileHeaderProps) => {
  const unsetToken = useAuthStore((state) => state.unsetToken);

  const handleLogout = () => {
    unsetToken();
  };

  return (
    <div className="lg:hidden bg-background border-b">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between h-8">
          {/* Левая часть - меню и заголовок */}
          <div className="flex items-center space-x-3 min-w-0 flex-1">
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
            <h1 className="text-base font-semibold truncate">
              {title || "AUTOGROUP - Аналитика звонков"}
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