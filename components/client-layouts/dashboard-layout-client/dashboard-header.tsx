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
import UserMenu from './user-menu';

interface HeaderProps {
  pageTitle: string;
  totalCalls: number;
  onExport: (format: 'csv' | 'xlsx') => void;
  isExporting: boolean;
  showExportMenu: boolean;
}

const DashboardHeader = ({
  pageTitle,
  totalCalls,
  onExport,
  isExporting,
  showExportMenu,
}: HeaderProps) => {
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full border-b bg-background">
      <div className="px-4 py-3">
        {/* Компактный хедер с точной высотой 32px */}
        <div className="flex h-8 items-center justify-between">
          {/* Левая часть - заголовок и дата */}
          <div className="flex h-full min-w-0 flex-1 items-center space-x-3">
            <h1 className="truncate text-base leading-none font-semibold tracking-tight">
              {pageTitle}
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
                Сегодня, {getCurrentDate()}
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
                    onClick={() => onExport('csv')}
                    disabled={isExporting}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Экспорт в CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onExport('xlsx')}
                    disabled={isExporting}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Экспорт в Excel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <UserMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
