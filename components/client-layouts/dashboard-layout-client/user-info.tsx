'use client';

import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserInfoProps {
  name?: string;
  email?: string;
  compact?: boolean;
  className?: string;
  onLogout?: () => void;
}

const UserInfo = ({ 
  name = "Администратор",
  email = "admin@autogroup.ru",
  compact = false,
  className,
  onLogout
}: UserInfoProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={cn(
          "flex items-center gap-2 px-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer",
          compact ? "min-w-0 h-8" : "space-x-3 h-8",
          className
        )}>
          {/* Аватар */}
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-medium flex-shrink-0">
            {name?.charAt(0) || 'А'}
          </div>
          
          {/* Информация о пользователе */}
          {!compact && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate leading-none">{name}</p>
              <p className="text-xs text-muted-foreground truncate opacity-75 leading-none">{email}</p>
            </div>
          )}
          
          {/* Стрелка вниз для dropdown */}
          {!compact && (
            <ChevronDown className="h-3 w-3 text-muted-foreground flex-shrink-0" />
          )}
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Профиль</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Настройки</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserInfo; 