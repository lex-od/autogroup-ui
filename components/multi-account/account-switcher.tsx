'use client';

import { FC, useState, useMemo } from 'react';
import { Check, Plus, Settings, Activity, AlertCircle } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useBinotelAccounts } from '@/services/api/queries/multi-account.queries';
import type { BinotelAccount } from '@/types/multi-account.types';

interface AccountSwitcherProps {
  organizationId?: string | null;
  value?: string | null;
  onValueChange?: (accountId: string | null, account: BinotelAccount | null) => void;
  onCreateNew?: () => void;
  onSettings?: (accountId: string) => void;
  placeholder?: string;
  disabled?: boolean;
  showAll?: boolean; // Показывать все аккаунты или только активные
  className?: string;
}

const AccountSwitcher: FC<AccountSwitcherProps> = ({
  organizationId,
  value,
  onValueChange,
  onCreateNew,
  onSettings,
  placeholder = "Выберите аккаунт Binotel",
  disabled = false,
  showAll = false,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  
  const { 
    data: accounts = [], 
    isLoading, 
    error 
  } = useBinotelAccounts({ 
    organization_id: organizationId || undefined,
    is_active: showAll ? undefined : true
  });

  const selectedAccount = accounts.find(acc => acc.id === value);

  // Группируем аккаунты по статусу
  const { activeAccounts, inactiveAccounts } = useMemo(() => {
    const active = accounts.filter(acc => acc.is_active);
    const inactive = accounts.filter(acc => !acc.is_active);
    return { activeAccounts: active, inactiveAccounts: inactive };
  }, [accounts]);

  const handleSelect = (accountId: string) => {
    if (accountId === 'create-new') {
      onCreateNew?.();
      return;
    }
    
    const account = accounts.find(acc => acc.id === accountId);
    onValueChange?.(accountId, account || null);
    setOpen(false);
  };

  const handleClear = () => {
    onValueChange?.(null, null);
  };

  const handleSettingsClick = (e: React.MouseEvent, accountId: string) => {
    e.stopPropagation();
    onSettings?.(accountId);
  };

  if (!organizationId) {
    return (
      <div className={`${className}`}>
        <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
          <p className="text-sm text-gray-600">
            Сначала выберите организацию
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`space-y-2 ${className}`}>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className}`}>
        <div className="rounded-md border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-600">
            Ошибка загрузки аккаунтов: {error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Аккаунт Binotel
        </label>
        <div className="flex items-center gap-2">
          {value && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-auto p-1 text-xs text-gray-500 hover:text-gray-700"
            >
              Очистить
            </Button>
          )}
        </div>
      </div>

      <Select
        value={value || ''}
        onValueChange={handleSelect}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder}>
            {selectedAccount && (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  {/* Индикатор статуса */}
                  <div className={`w-2 h-2 rounded-full ${
                    selectedAccount.is_active 
                      ? 'bg-green-500' 
                      : 'bg-gray-400'
                  }`} />
                  
                  <div className="flex flex-col items-start">
                    <span className="font-medium">
                      {selectedAccount.account_name}
                    </span>
                    <div className="flex gap-2 text-xs text-gray-500">
                      <span>({selectedAccount.account_code})</span>
                      {selectedAccount.binotel_company_id && (
                        <>
                          <span>•</span>
                          <span>ID: {selectedAccount.binotel_company_id}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Статус аккаунта */}
                  {!selectedAccount.is_active && (
                    <Badge variant="destructive" className="text-xs">
                      Неактивен
                    </Badge>
                  )}
                  
                  {/* Кнопка настроек */}
                  {onSettings && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleSettingsClick(e, selectedAccount.id)}
                      className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {/* Активные аккаунты */}
          {activeAccounts.length > 0 && (
            <>
              {activeAccounts.map((account) => (
                <SelectItem
                  key={account.id}
                  value={account.id}
                  className="cursor-pointer"
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <div className="flex flex-col items-start">
                        <span className="font-medium">
                          {account.account_name}
                        </span>
                        <div className="flex gap-2 text-xs text-gray-500">
                          <span>({account.account_code})</span>
                          {account.binotel_company_id && (
                            <>
                              <span>•</span>
                              <span>ID: {account.binotel_company_id}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Индикатор синхронизации */}
                      {account.last_sync_at && (
                        <Activity className="h-3 w-3 text-green-600" />
                      )}
                      
                      {value === account.id && (
                        <Check className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                  </div>
                </SelectItem>
              ))}
            </>
          )}

          {/* Неактивные аккаунты */}
          {inactiveAccounts.length > 0 && showAll && (
            <>
              <div className="px-2 py-1.5 text-xs font-medium text-gray-500 bg-gray-50 border-t">
                Неактивные аккаунты
              </div>
              {inactiveAccounts.map((account) => (
                <SelectItem
                  key={account.id}
                  value={account.id}
                  className="cursor-pointer opacity-60"
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gray-400" />
                      <div className="flex flex-col items-start">
                        <span className="font-medium text-gray-600">
                          {account.account_name}
                        </span>
                        <div className="flex gap-2 text-xs text-gray-400">
                          <span>({account.account_code})</span>
                          {account.binotel_company_id && (
                            <>
                              <span>•</span>
                              <span>ID: {account.binotel_company_id}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive" className="text-xs">
                        Неактивен
                      </Badge>
                      <AlertCircle className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                </SelectItem>
              ))}
            </>
          )}

          {/* Опция создания нового аккаунта */}
          {onCreateNew && (
            <>
              <div className="px-2 py-1.5 border-t">
                <SelectItem
                  value="create-new"
                  className="cursor-pointer text-blue-600 hover:text-blue-700"
                >
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Добавить аккаунт Binotel</span>
                  </div>
                </SelectItem>
              </div>
            </>
          )}

          {/* Пустой список */}
          {accounts.length === 0 && (
            <div className="px-2 py-6 text-center text-sm text-gray-500">
              <p>Аккаунты Binotel не найдены</p>
              {onCreateNew && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onCreateNew}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить первый аккаунт
                </Button>
              )}
            </div>
          )}
        </SelectContent>
      </Select>

      {/* Дополнительная информация о выбранном аккаунте */}
      {selectedAccount && (
        <div className="text-xs text-gray-600 space-y-1">
          {selectedAccount.webhook_url && (
            <div className="flex items-center gap-1">
              <span>Webhook:</span>
              <span className="font-mono bg-gray-100 px-1 rounded">
                {selectedAccount.webhook_url}
              </span>
            </div>
          )}
          {selectedAccount.last_sync_at && (
            <div className="flex items-center gap-1">
              <Activity className="h-3 w-3" />
              <span>Последняя синхронизация:</span>
              <span>
                {new Date(selectedAccount.last_sync_at).toLocaleString('ru-RU')}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountSwitcher; 