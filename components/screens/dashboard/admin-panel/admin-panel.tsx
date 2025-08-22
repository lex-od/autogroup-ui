'use client';

import { useState } from 'react';
import { Info, Users, Key, MessageSquare } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AdminPanelTabs from './admin-panel-tabs/admin-panel-tabs';

const AdminPanel = () => {
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showCreateApiModal, setShowCreateApiModal] = useState(false);
  const [showCreatePromptModal, setShowCreatePromptModal] = useState(false);

  const handleCreateUser = () => {
    setShowCreateUserModal(true);
  };

  const handleCreateApiConfig = () => {
    setShowCreateApiModal(true);
  };

  const handleCreatePrompt = () => {
    setShowCreatePromptModal(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditUser = (user: any) => {
    console.log('Редактирование пользователя:', user);
    // TODO: Открыть модалку редактирования пользователя
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditApiConfig = (config: any) => {
    console.log('Редактирование API конфигурации:', config);
    // TODO: Открыть модалку редактирования API
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditPrompt = (prompt: any) => {
    console.log('Редактирование промпта:', prompt);
    // TODO: Открыть модалку редактирования промпта
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewPrompt = (prompt: any) => {
    console.log('Просмотр промпта:', prompt);
    // TODO: Открыть модалку просмотра промпта
  };

  return (
    <div className="h-full w-full">
      <div className="mx-auto max-w-7xl space-y-6 p-4 lg:p-6">
        {/* Заголовок и описание */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Панель администратора
          </h1>
          <p className="text-muted-foreground">
            Управление пользователями, настройка системы и мониторинг
          </p>
        </div>

        {/* Информационная панель */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Info className="h-5 w-5" />
              Добро пожаловать в панель администратора
            </CardTitle>
            <CardDescription className="text-blue-700">
              Здесь вы можете управлять всеми аспектами системы Call Analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="font-medium text-blue-900">
                  ✅ Доступные функции:
                </div>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Управление пользователями</li>
                  <li>• Настройка API-ключей</li>
                  <li>• Управление AI-промптами</li>
                  <li>• Мониторинг системы</li>
                  <li>• Просмотр логов</li>
                </ul>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-blue-900">
                  🔧 Быстрые действия:
                </div>
                <div className="space-y-2">
                  <Button
                    size="sm"
                    onClick={handleCreateUser}
                    className="w-full gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Добавить пользователя
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCreateApiConfig}
                    className="w-full gap-2"
                  >
                    <Key className="h-4 w-4" />
                    Добавить API-ключ
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCreatePrompt}
                    className="w-full gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Создать промпт
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-blue-900">
                  📊 Статус системы:
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">
                      ✅ Система работает
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">
                      ✅ API доступны
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">⚠️ Mock данные</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Основная админ-панель */}
        <AdminPanelTabs
          onCreateUser={handleCreateUser}
          onEditUser={handleEditUser}
          onCreateApiConfig={handleCreateApiConfig}
          onEditApiConfig={handleEditApiConfig}
          onCreatePrompt={handleCreatePrompt}
          onEditPrompt={handleEditPrompt}
          onViewPrompt={handleViewPrompt}
        />

        {/* Placeholder модалки (TODO: заменить на реальные формы) */}
        {showCreateUserModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Создание пользователя</CardTitle>
                <CardDescription>
                  Форма создания нового пользователя будет реализована позже
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setShowCreateUserModal(false)}>
                  Закрыть
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {showCreateApiModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Добавление API-ключа</CardTitle>
                <CardDescription>
                  Форма добавления API-ключа будет реализована позже
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setShowCreateApiModal(false)}>
                  Закрыть
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {showCreatePromptModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Создание промпта</CardTitle>
                <CardDescription>
                  Форма создания AI-промпта будет реализована позже
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setShowCreatePromptModal(false)}>
                  Закрыть
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
