'use client';

import { FC, useState, useEffect } from 'react';
import { Users, Building2, BarChart3, Settings, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// import { Separator } from '@/components/ui/separator'; // Не существует, используем hr
import OrganizationSelector from './organization-selector';
import AccountSwitcher from './account-switcher';
import { useBinotelAccountStats } from '@/services/api/queries/multi-account.queries';
import type { Organization, BinotelAccount, OrganizationWithAccounts } from '@/types/multi-account.types';

interface MultiAccountDashboardProps {
  // Состояние
  selectedOrganization?: OrganizationWithAccounts | null;
  selectedAccount?: BinotelAccount | null;
  
  // Обработчики выбора
  onOrganizationChange?: (organizationId: string | null, organization: OrganizationWithAccounts | null) => void;
  onAccountChange?: (accountId: string | null, account: BinotelAccount | null) => void;
  
  // Обработчики действий
  onCreateOrganization?: () => void;
  onCreateAccount?: () => void;
  onManageOrganization?: (organizationId: string) => void;
  onManageAccount?: (accountId: string) => void;
  
  // Настройки отображения
  showStats?: boolean;
  compact?: boolean;
  className?: string;
}

const MultiAccountDashboard: FC<MultiAccountDashboardProps> = ({
  selectedOrganization,
  selectedAccount,
  onOrganizationChange,
  onAccountChange,
  onCreateOrganization,
  onCreateAccount,
  onManageOrganization,
  onManageAccount,
  showStats = true,
  compact = false,
  className = '',
}) => {
  const [organizationId, setOrganizationId] = useState<string | null>(
    selectedOrganization?.id || null
  );
  const [accountId, setAccountId] = useState<string | null>(
    selectedAccount?.id || null
  );

  // Загружаем статистику для выбранной организации
  const { 
    data: accountStats = [], 
    isLoading: statsLoading 
  } = useBinotelAccountStats(organizationId || undefined);

  // Обновляем внутреннее состояние при изменении props
  useEffect(() => {
    if (selectedOrganization?.id !== organizationId) {
      setOrganizationId(selectedOrganization?.id || null);
    }
  }, [selectedOrganization?.id, organizationId]);

  useEffect(() => {
    if (selectedAccount?.id !== accountId) {
      setAccountId(selectedAccount?.id || null);
    }
  }, [selectedAccount?.id, accountId]);

  // Обработчики
  const handleOrganizationChange = (
    newOrganizationId: string | null, 
    organization: OrganizationWithAccounts | null
  ) => {
    setOrganizationId(newOrganizationId);
    setAccountId(null); // Сбрасываем выбранный аккаунт при смене организации
    onOrganizationChange?.(newOrganizationId, organization);
    onAccountChange?.(null, null); // Уведомляем о сбросе аккаунта
  };

  const handleAccountChange = (
    newAccountId: string | null, 
    account: BinotelAccount | null
  ) => {
    setAccountId(newAccountId);
    onAccountChange?.(newAccountId, account);
  };

  // Вычисляем статистику
  const totalCalls = accountStats.reduce((sum, stat) => sum + stat.total_calls, 0);
  const avgSentiment = accountStats.length > 0 
    ? accountStats.reduce((sum, stat) => sum + stat.avg_sentiment_score, 0) / accountStats.length
    : 0;
  const activeAccountsCount = selectedOrganization?.active_accounts || 0;

  if (compact) {
    return (
      <div className={`flex gap-4 ${className}`}>
        <div className="flex-1">
          <OrganizationSelector
            value={organizationId}
            onValueChange={handleOrganizationChange}
            onCreateNew={onCreateOrganization}
            showStats={false}
          />
        </div>
        <div className="flex-1">
          <AccountSwitcher
            organizationId={organizationId}
            value={accountId}
            onValueChange={handleAccountChange}
            onCreateNew={onCreateAccount}
            onSettings={onManageAccount}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Управление аккаунтами
          </h2>
          <p className="text-gray-600">
            Выберите организацию и аккаунт Binotel для работы
          </p>
        </div>
        
        <div className="flex gap-2">
          {onCreateOrganization && (
            <Button
              variant="outline"
              onClick={onCreateOrganization}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Организация
            </Button>
          )}
          {onCreateAccount && organizationId && (
            <Button
              onClick={onCreateAccount}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Аккаунт Binotel
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Выбор организации */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Организация
            </CardTitle>
            <CardDescription>
              Выберите организацию для управления её аккаунтами Binotel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OrganizationSelector
              value={organizationId}
              onValueChange={handleOrganizationChange}
              onCreateNew={onCreateOrganization}
              showStats={true}
            />
            
            {selectedOrganization && onManageOrganization && (
              <div className="mt-4 pt-4 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onManageOrganization(selectedOrganization.id)}
                  className="w-full gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Управлять организацией
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Выбор аккаунта Binotel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Аккаунт Binotel
            </CardTitle>
            <CardDescription>
              Выберите конкретный аккаунт Binotel для анализа звонков
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AccountSwitcher
              organizationId={organizationId}
              value={accountId}
              onValueChange={handleAccountChange}
              onCreateNew={onCreateAccount}
              onSettings={onManageAccount}
              showAll={false}
            />
          </CardContent>
        </Card>
      </div>

      {/* Статистика и информация */}
      {showStats && selectedOrganization && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Обзор организации
            </CardTitle>
            <CardDescription>
              Статистика по выбранной организации "{selectedOrganization.name}"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Активные аккаунты */}
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-green-600">
                  {activeAccountsCount}
                </span>
                <span className="text-sm text-gray-600">
                  Активных аккаунтов
                </span>
              </div>

              {/* Общее количество звонков */}
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-blue-600">
                  {totalCalls.toLocaleString('ru-RU')}
                </span>
                <span className="text-sm text-gray-600">
                  Всего звонков
                </span>
              </div>

              {/* Средняя тональность */}
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-purple-600">
                  {avgSentiment > 0 ? `${(avgSentiment * 100).toFixed(1)}%` : 'N/A'}
                </span>
                <span className="text-sm text-gray-600">
                  Средняя тональность
                </span>
              </div>

              {/* Статус организации */}
              <div className="flex flex-col">
                <Badge 
                  variant={selectedOrganization.is_active ? "default" : "destructive"}
                  className="w-fit"
                >
                  {selectedOrganization.is_active ? 'Активна' : 'Неактивна'}
                </Badge>
                <span className="text-sm text-gray-600 mt-1">
                  Статус организации
                </span>
              </div>
            </div>

            {/* Список аккаунтов */}
            {selectedOrganization.binotel_accounts && selectedOrganization.binotel_accounts.length > 0 && (
              <>
                <hr className="my-4 border-gray-200" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Аккаунты Binotel ({selectedOrganization.binotel_accounts.length})
                  </h4>
                  <div className="space-y-2">
                    {selectedOrganization.binotel_accounts.map((account) => (
                      <div
                        key={account.id}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          account.id === accountId 
                            ? 'border-blue-200 bg-blue-50' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            account.is_active ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                          <div>
                            <span className="font-medium">
                              {account.account_name}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                              ({account.account_code})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {!account.is_active && (
                            <Badge variant="destructive" className="text-xs">
                              Неактивен
                            </Badge>
                          )}
                          {account.id === accountId && (
                            <Badge className="text-xs">
                              Выбран
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Подсказки пользователю */}
      {!organizationId && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900 mb-1">
                  Начните с выбора организации
                </h3>
                <p className="text-blue-700 text-sm">
                  Выберите организацию выше, чтобы увидеть доступные аккаунты Binotel и начать анализ звонков.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {organizationId && !accountId && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-orange-900 mb-1">
                  Выберите аккаунт Binotel
                </h3>
                <p className="text-orange-700 text-sm">
                  Выберите конкретный аккаунт Binotel для просмотра и анализа звонков этого аккаунта.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MultiAccountDashboard;