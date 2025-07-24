'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Plug, 
  CheckCircle, 
  AlertCircle, 
  Settings, 
  Phone, 
  ExternalLink,
  Copy,
  Eye,
  EyeOff
} from 'lucide-react';

const IntegrationsPage = () => {
  const [showWebhookUrl, setShowWebhookUrl] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const integrations = [
    {
      name: 'Binotel',
      description: 'Автоматический прием звонков через webhook',
      status: 'connected',
      icon: Phone,
      webhookUrl: 'https://your-domain.com/functions/v1/binotel-webhook',
      lastSync: '25.01.2025, 11:30',
    },
    {
      name: 'Twilio',
      description: 'Облачная телефония и SMS',
      status: 'available',
      icon: Phone,
      webhookUrl: '',
      lastSync: null,
    },
    {
      name: 'Oktell',
      description: 'IP-телефония и call-центр',
      status: 'available',
      icon: Phone,
      webhookUrl: '',
      lastSync: null,
    },
    {
      name: 'Mango Office',
      description: 'Виртуальная АТС',
      status: 'available',
      icon: Phone,
      webhookUrl: '',
      lastSync: null,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800">✅ Подключено</Badge>;
      case 'disconnected':
        return <Badge variant="destructive">❌ Отключено</Badge>;
      case 'available':
        return <Badge variant="outline">📋 Доступно</Badge>;
      default:
        return <Badge variant="secondary">❓ Неизвестно</Badge>;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // TODO: Показать toast уведомление
  };

  return (
    <div className="h-full w-full">
      <div className="mx-auto max-w-7xl space-y-6 p-4 lg:p-6">
        {/* Заголовок */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Интеграции</h1>
          <p className="text-muted-foreground">
            Настройка подключения к внешним системам и провайдерам телефонии
          </p>
        </div>

        {/* Общая информация */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center gap-2">
              <Plug className="h-5 w-5" />
              Webhook настройки
            </CardTitle>
            <CardDescription className="text-blue-700">
              Используйте эти URL для настройки автоматического приема звонков
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="webhook-url">Webhook URL для провайдеров телефонии</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="webhook-url"
                    readOnly
                    value="https://your-domain.com/functions/v1/binotel-webhook"
                    className="font-mono text-sm"
                  />
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyToClipboard('https://your-domain.com/functions/v1/binotel-webhook')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Скопируйте этот URL и добавьте в настройки webhook вашего провайдера телефонии
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Список интеграций */}
        <div className="grid gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Провайдеры телефонии</h2>
            <div className="grid gap-4">
              {integrations.map((integration) => {
                const Icon = integration.icon;
                return (
                  <Card key={integration.name}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-semibold">{integration.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {integration.description}
                            </p>
                            {integration.lastSync && (
                              <p className="text-xs text-muted-foreground">
                                Последняя синхронизация: {integration.lastSync}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(integration.status)}
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-2" />
                            Настроить
                          </Button>
                        </div>
                      </div>

                      {integration.status === 'connected' && (
                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium text-green-800">
                                Интеграция активна
                              </span>
                            </div>
                            
                            <div className="space-y-2">
                              <Label className="text-green-800">Webhook URL</Label>
                              <div className="flex gap-2">
                                <Input
                                  readOnly
                                  value={integration.webhookUrl}
                                  className="font-mono text-sm bg-white"
                                />
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => copyToClipboard(integration.webhookUrl)}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline" className="h-6 w-12 bg-green-100 border-green-300">
                                  ✓
                                </Button>
                                <Label className="text-green-800">Автоматический прием звонков</Label>
                              </div>
                              <Button size="sm" variant="outline">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Тест подключения
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* CRM интеграции */}
          <div>
            <h2 className="text-xl font-semibold mb-4">CRM системы</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted mx-auto mb-4">
                    <Plug className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">CRM интеграции</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Интеграция с Salesforce, Bitrix24 и другими CRM будет добавлена в следующих версиях
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
            <h2 className="text-xl font-semibold mb-4">API настройки</h2>
            <Card>
              <CardHeader>
                <CardTitle>API ключи</CardTitle>
                <CardDescription>
                  Управление API ключами для интеграций
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="api-key">API ключ для webhook доступа</Label>
                    <div className="flex gap-2 mt-1">
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
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard('sk_test_1234567890abcdef')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
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
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage; 