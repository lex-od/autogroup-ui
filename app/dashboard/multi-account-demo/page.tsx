'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MultiAccountDashboard,
  OrganizationSelector,
  AccountSwitcher
} from '@/components/multi-account';
import type { OrganizationWithAccounts, BinotelAccount } from '@/types/multi-account.types';

const MultiAccountDemoPage = () => {
  const [selectedOrganization, setSelectedOrganization] = useState<OrganizationWithAccounts | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<BinotelAccount | null>(null);
  const [viewMode, setViewMode] = useState<'full' | 'compact' | 'separate'>('full');

  const handleOrganizationChange = (
    organizationId: string | null, 
    organization: OrganizationWithAccounts | null
  ) => {
    setSelectedOrganization(organization);
    console.log('Organization changed:', { organizationId, organization });
  };

  const handleAccountChange = (
    accountId: string | null, 
    account: BinotelAccount | null
  ) => {
    setSelectedAccount(account);
    console.log('Account changed:', { accountId, account });
  };

  const handleCreateOrganization = () => {
    console.log('Create organization clicked');
    alert('Создание организации - функция в разработке');
  };

  const handleCreateAccount = () => {
    console.log('Create account clicked');
    alert('Создание аккаунта Binotel - функция в разработке');
  };

  const handleManageOrganization = (organizationId: string) => {
    console.log('Manage organization:', organizationId);
    alert(`Управление организацией ${organizationId} - функция в разработке`);
  };

  const handleManageAccount = (accountId: string) => {
    console.log('Manage account:', accountId);
    alert(`Управление аккаунтом ${accountId} - функция в разработке`);
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Заголовок и навигация */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Демо мультиаккаунтных компонентов
          </h1>
          <p className="text-gray-600 mt-1">
            Тестирование и демонстрация функциональности управления организациями и аккаунтами Binotel
          </p>
        </div>

        {/* Переключатель режимов отображения */}
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'full' ? 'default' : 'outline'}
            onClick={() => setViewMode('full')}
            size="sm"
          >
            Полный режим
          </Button>
          <Button
            variant={viewMode === 'compact' ? 'default' : 'outline'}
            onClick={() => setViewMode('compact')}
            size="sm"
          >
            Компактный
          </Button>
          <Button
            variant={viewMode === 'separate' ? 'default' : 'outline'}
            onClick={() => setViewMode('separate')}
            size="sm"
          >
            Раздельно
          </Button>
        </div>
      </div>

      {/* Полный режим - MultiAccountDashboard */}
      {viewMode === 'full' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">MultiAccountDashboard (Полный режим)</h2>
          <MultiAccountDashboard
            selectedOrganization={selectedOrganization}
            selectedAccount={selectedAccount}
            onOrganizationChange={handleOrganizationChange}
            onAccountChange={handleAccountChange}
            onCreateOrganization={handleCreateOrganization}
            onCreateAccount={handleCreateAccount}
            onManageOrganization={handleManageOrganization}
            onManageAccount={handleManageAccount}
            showStats={true}
            compact={false}
          />
        </div>
      )}

      {/* Компактный режим */}
      {viewMode === 'compact' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">MultiAccountDashboard (Компактный режим)</h2>
          <Card>
            <CardHeader>
              <CardTitle>Компактный селектор</CardTitle>
              <CardDescription>
                Горизонтальное расположение селекторов без статистики
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MultiAccountDashboard
                selectedOrganization={selectedOrganization}
                selectedAccount={selectedAccount}
                onOrganizationChange={handleOrganizationChange}
                onAccountChange={handleAccountChange}
                onCreateOrganization={handleCreateOrganization}
                onCreateAccount={handleCreateAccount}
                showStats={false}
                compact={true}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Раздельные компоненты */}
      {viewMode === 'separate' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Раздельные компоненты</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* OrganizationSelector */}
            <Card>
              <CardHeader>
                <CardTitle>OrganizationSelector</CardTitle>
                <CardDescription>
                  Компонент для выбора организации с дополнительной информацией
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OrganizationSelector
                  value={selectedOrganization?.id || null}
                  onValueChange={handleOrganizationChange}
                  onCreateNew={handleCreateOrganization}
                  showStats={true}
                />
              </CardContent>
            </Card>

            {/* AccountSwitcher */}
            <Card>
              <CardHeader>
                <CardTitle>AccountSwitcher</CardTitle>
                <CardDescription>
                  Компонент для переключения между аккаунтами Binotel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AccountSwitcher
                  organizationId={selectedOrganization?.id || null}
                  value={selectedAccount?.id || null}
                  onValueChange={handleAccountChange}
                  onCreateNew={handleCreateAccount}
                  onSettings={handleManageAccount}
                  showAll={true}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Информация о текущем выборе */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>Текущий выбор</CardTitle>
          <CardDescription>
            Отладочная информация о выбранных организации и аккаунте
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Выбранная организация */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Организация:</h4>
              {selectedOrganization ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{selectedOrganization.name}</span>
                    <Badge variant={selectedOrganization.is_active ? "default" : "destructive"}>
                      {selectedOrganization.is_active ? 'Активна' : 'Неактивна'}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>ID: {selectedOrganization.id}</p>
                    {selectedOrganization.description && (
                      <p>Описание: {selectedOrganization.description}</p>
                    )}
                    <p>Аккаунтов: {selectedOrganization.binotel_accounts?.length || 0}</p>
                    <p>Звонков: {selectedOrganization.total_calls}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Организация не выбрана</p>
              )}
            </div>

            {/* Выбранный аккаунт */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Аккаунт Binotel:</h4>
              {selectedAccount ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{selectedAccount.account_name}</span>
                    <Badge variant={selectedAccount.is_active ? "default" : "destructive"}>
                      {selectedAccount.is_active ? 'Активен' : 'Неактивен'}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>ID: {selectedAccount.id}</p>
                    <p>Код: {selectedAccount.account_code}</p>
                    {selectedAccount.binotel_company_id && (
                      <p>Company ID: {selectedAccount.binotel_company_id}</p>
                    )}
                    {selectedAccount.last_sync_at && (
                      <p>Последняя синхронизация: {new Date(selectedAccount.last_sync_at).toLocaleString('ru-RU')}</p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Аккаунт не выбран</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Примечания для разработчика */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900">Примечания для разработчика</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800 text-sm space-y-2">
          <p>• Все обработчики событий выводят информацию в консоль браузера</p>
          <p>• Компоненты полностью функциональны и готовы к интеграции</p>
          <p>• API запросы выполняются к существующим Edge Functions через MCP</p>
          <p>• Поддерживается real-time обновление данных через React Query</p>
          <p>• Компоненты адаптивны и работают на всех размерах экрана</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiAccountDemoPage; 