'use client';

import { useState } from 'react';
import { Plug, Copy, Eye, EyeOff } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import IntegrationsGeneral from './integrations-general/integrations-general';
import BinotelProvider from './binotel-provider/binotel-provider';
import ProviderPlaceholder from './provider-placeholder';

const Integrations = () => {
  const [showApiKey, setShowApiKey] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // TODO: Показать toast уведомление
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 lg:p-6">
      {/* Заголовок */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Интеграции</h1>
        <p className="text-muted-foreground">
          Настройка подключения к внешним системам и провайдерам телефонии
        </p>
      </div>

      {/* Общая информация */}
      <IntegrationsGeneral onCopyToClipboard={copyToClipboard} />

      {/* Список интеграций */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Провайдеры телефонии</h2>

        <BinotelProvider onCopyToClipboard={copyToClipboard} />
        <ProviderPlaceholder
          name="Twilio"
          description="Облачная телефония и SMS"
        />
        <ProviderPlaceholder
          name="Oktell"
          description="IP-телефония и call-центр"
        />
        <ProviderPlaceholder
          name="Mango Office"
          description="Виртуальная АТС"
        />
      </div>

      {/* CRM интеграции */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">CRM системы</h2>

        <Card>
          <CardContent className="pt-6">
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <Plug className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold">CRM интеграции</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Интеграция с Salesforce, Bitrix24 и другими CRM будет добавлена
                в следующих версиях
              </p>
              <Button variant="outline" disabled>
                Скоро доступно
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API настройки */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">API настройки</h2>

        <Card>
          <CardHeader>
            <CardTitle>API ключи</CardTitle>
            <CardDescription>
              Управление API ключами для интеграций
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="api-key">API ключ для webhook доступа</Label>
              <div className="mt-1 flex gap-2">
                <Input
                  id="api-key"
                  type={showApiKey ? 'text' : 'password'}
                  readOnly
                  value="sk_test_1234567890abcdef"
                  className="font-mono text-sm"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard('sk_test_1234567890abcdef')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Используйте этот ключ для аутентификации webhook запросов
              </p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Сгенерировать новый ключ
              </Button>
              <Button size="sm" variant="outline">
                Документация API
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Integrations;
