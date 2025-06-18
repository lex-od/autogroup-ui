'use client';

import { CalendarDays, MoreVertical, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/stores/auth/auth-store-provider';
import UserInfo from './user-info';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  pageTitle?: string;
  totalCalls?: number;
  onExport?: (format: 'csv' | 'xlsx') => void;
  isExporting?: boolean;
  showExportMenu?: boolean;
}

const Header = ({
  title = 'AUTOGROUP - Аналитика звонков',
  subtitle,
  pageTitle,
  totalCalls = 0,
  onExport,
  isExporting = false,
  showExportMenu = false,
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

  const handleExport = (format: 'csv' | 'xlsx') => {
    if (onExport) {
      onExport(format);
    }
  };

  return (
    <div className="w-full border-b bg-background">
      <div className="px-4 py-3">
        {/* Компактный хедер с точной высотой 32px */}
        <div className="flex h-8 items-center justify-between">
          {/* Левая часть - заголовок и дата */}
          <div className="flex h-full min-w-0 flex-1 items-center space-x-3">
            <h1 className="truncate text-base leading-none font-semibold tracking-tight">
              {pageTitle || title}
            </h1>
            <Badge
              variant="secondary"
              className="flex h-5 items-center px-2 py-0.5 text-xs"
            >
              {totalCalls} звонков
            </Badge>
            <div className="hidden h-full items-center space-x-1 text-xs text-muted-foreground lg:flex">
              <CalendarDays className="h-4 w-4" />
              <span className="truncate leading-none">
                {subtitle || `Сегодня, ${getCurrentDate()}`}
              </span>
            </div>
          </div>

          {/* Правая часть - кнопки и пользователь */}
          <div className="flex h-full items-center space-x-2">
            {/* Меню экспорта */}
            {showExportMenu && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    disabled={isExporting}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleExport('csv')}
                    disabled={isExporting}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Экспорт в CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleExport('xlsx')}
                    disabled={isExporting}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Экспорт в Excel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <UserInfo compact={false} onLogout={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
