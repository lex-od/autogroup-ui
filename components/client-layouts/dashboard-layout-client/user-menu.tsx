'use client';

import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useCurrentUserQuery,
  useLogoutMutation,
} from '@/services/api/auth.api';

interface UserInfoProps {
  compact?: boolean;
}

const UserMenu = ({ compact = false }: UserInfoProps) => {
  const queryClient = useQueryClient();

  const { data: currUser, isPending: isCurrUserPending } =
    useCurrentUserQuery();

  const logout = useLogoutMutation({
    onSuccess: () => {
      queryClient.clear();
    },
  });

  const name = currUser?.user?.user_metadata.full_name as string | undefined;
  const email = currUser?.user?.email;

  if (isCurrUserPending) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            'flex cursor-default items-center gap-2 rounded-lg bg-muted/50 px-3 transition-colors hover:bg-muted',
            compact ? 'h-8 min-w-0' : 'h-8 space-x-3',
          )}
        >
          {/* Аватар */}
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
            {name?.charAt(0) || 'А'}
          </div>

          {/* Информация о пользователе */}
          {!compact && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs leading-none font-medium">
                {name}
              </p>
              <p className="truncate text-xs leading-none text-muted-foreground opacity-75">
                {email}
              </p>
            </div>
          )}

          {/* Стрелка вниз для dropdown */}
          {!compact && (
            <ChevronDown className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{name}</p>
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
        <DropdownMenuItem onClick={() => logout.mutate()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
