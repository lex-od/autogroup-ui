'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminDashboard } from '@/components/admin';
import type { UserProfile, ApiConfiguration, PromptConfiguration } from '@/types/admin.types';

const AdminDemoPage = () => {
  // Состояние для модалок (пока заглушки)
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showCreateApiConfig, setShowCreateApiConfig] = useState(false);
  const [showEditApiConfig, setShowEditApiConfig] = useState(false);
  const [showCreatePrompt, setShowCreatePrompt] = useState(false);
  const [showEditPrompt, setShowEditPrompt] = useState(false);
  const [showViewPrompt, setShowViewPrompt] = useState(false);

  // Выбранные элементы для редактирования
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [selectedApiConfig, setSelectedApiConfig] = useState<ApiConfiguration | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptConfiguration | null>(null);

  // Обработчики для пользователей
  const handleCreateUser = () => {
    setShowCreateUser(true);
    console.log('Открытие модалки создания пользователя');
  };

  const handleEditUser = (user: UserProfile) => {
    setSelectedUser(user);
    setShowEditUser(true);
    console.log('Редактирование пользователя:', user);
  };

  // Обработчики для API конфигураций
  const handleCreateApiConfig = () => {
    setShowCreateApiConfig(true);
    console.log('Открытие модалки создания API конфигурации');
  };

  const handleEditApiConfig = (config: ApiConfiguration) => {
    setSelectedApiConfig(config);
    setShowEditApiConfig(true);
    console.log('Редактирование API конфигурации:', config);
  };

  // Обработчики для промптов
  const handleCreatePrompt = () => {
    setShowCreatePrompt(true);
    console.log('Открытие модалки создания промпта');
  };

  const handleEditPrompt = (prompt: PromptConfiguration) => {
    setSelectedPrompt(prompt);
    setShowEditPrompt(true);
    console.log('Редактирование промпта:', prompt);
  };

  const handleViewPrompt = (prompt: PromptConfiguration) => {
    setSelectedPrompt(prompt);
    setShowViewPrompt(true);
    console.log('Просмотр промпта:', prompt);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Заголовок демо-страницы */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-blue-900">🚀 Демо: Админ-панель Call Analytics</CardTitle>
              <CardDescription className="text-blue-700">
                Тестирование всех компонентов административной панели с mock-данными
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
              DEMO режим
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-1">
              <div className="font-medium text-blue-900">✅ Реализовано:</div>
              <ul className="text-blue-700 space-y-1">
                <li>• Управление пользователями</li>
                <li>• Настройка API-ключей</li>
                <li>• Управление AI-промптами</li>
                <li>• Обзорный дашборд</li>
                <li>• React Query интеграция</li>
              </ul>
            </div>
            <div className="space-y-1">
              <div className="font-medium text-blue-900">⚠️ Mock данные:</div>
              <ul className="text-blue-700 space-y-1">
                <li>• API использует заглушки</li>
                <li>• Данные не сохраняются</li>
                <li>• Тестирование UI/UX</li>
                <li>• Полная функциональность</li>
              </ul>
            </div>
            <div className="space-y-1">
              <div className="font-medium text-blue-900">🔄 В разработке:</div>
              <ul className="text-blue-700 space-y-1">
                <li>• Модалки создания/редактирования</li>
                <li>• Edge Functions для API</li>
                <li>• Системные настройки</li>
                <li>• Просмотр логов</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Основной компонент админ-панели */}
      <AdminDashboard
        onCreateUser={handleCreateUser}
        onEditUser={handleEditUser}
        onCreateApiConfig={handleCreateApiConfig}
        onEditApiConfig={handleEditApiConfig}
        onCreatePrompt={handleCreatePrompt}
        onEditPrompt={handleEditPrompt}
        onViewPrompt={handleViewPrompt}
      />

      {/* Плейсхолдеры для модалок (пока заглушки) */}
      {showCreateUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Создание пользователя</CardTitle>
              <CardDescription>Модалка в разработке</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 py-8">
                  Модалка создания пользователя находится в разработке
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setShowCreateUser(false)}>
                    Закрыть
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showEditUser && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Редактирование пользователя</CardTitle>
              <CardDescription>Пользователь: {selectedUser.full_name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 py-8">
                  Модалка редактирования пользователя находится в разработке
                </div>
                <div className="text-sm bg-gray-50 p-3 rounded">
                  <div><strong>Email:</strong> {selectedUser.email}</div>
                  <div><strong>Роль:</strong> {selectedUser.role}</div>
                  <div><strong>Департамент:</strong> {selectedUser.department || 'Не указан'}</div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => {
                    setShowEditUser(false);
                    setSelectedUser(null);
                  }}>
                    Закрыть
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showCreateApiConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Создание API конфигурации</CardTitle>
              <CardDescription>Модалка в разработке</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 py-8">
                  Модалка создания API конфигурации находится в разработке
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setShowCreateApiConfig(false)}>
                    Закрыть
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showEditApiConfig && selectedApiConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Редактирование API конфигурации</CardTitle>
              <CardDescription>Сервис: {selectedApiConfig.service_name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 py-8">
                  Модалка редактирования API конфигурации находится в разработке
                </div>
                <div className="text-sm bg-gray-50 p-3 rounded">
                  <div><strong>Сервис:</strong> {selectedApiConfig.service_name}</div>
                  <div><strong>Endpoint:</strong> {selectedApiConfig.endpoint_url || 'Не указан'}</div>
                  <div><strong>Статус:</strong> {selectedApiConfig.is_active ? 'Активен' : 'Неактивен'}</div>
                  <div><strong>Использований:</strong> {selectedApiConfig.usage_count}</div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => {
                    setShowEditApiConfig(false);
                    setSelectedApiConfig(null);
                  }}>
                    Закрыть
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showCreatePrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Создание промпта</CardTitle>
              <CardDescription>Модалка в разработке</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 py-8">
                  Модалка создания промпта находится в разработке
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setShowCreatePrompt(false)}>
                    Закрыть
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showEditPrompt && selectedPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Редактирование промпта</CardTitle>
              <CardDescription>Промпт: {selectedPrompt.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 py-8">
                  Модалка редактирования промпта находится в разработке
                </div>
                <div className="text-sm bg-gray-50 p-3 rounded space-y-2">
                  <div><strong>Название:</strong> {selectedPrompt.name}</div>
                  <div><strong>Тип:</strong> {selectedPrompt.prompt_type}</div>
                  <div><strong>Версия:</strong> {selectedPrompt.version}</div>
                  <div><strong>Описание:</strong> {selectedPrompt.description || 'Не указано'}</div>
                  <div><strong>Статус:</strong> {selectedPrompt.is_active ? 'Активен' : 'Неактивен'}</div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => {
                    setShowEditPrompt(false);
                    setSelectedPrompt(null);
                  }}>
                    Закрыть
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showViewPrompt && selectedPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Просмотр промпта</CardTitle>
              <CardDescription>Полное содержимое промпта: {selectedPrompt.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm bg-gray-50 p-3 rounded space-y-2">
                  <div><strong>Название:</strong> {selectedPrompt.name}</div>
                  <div><strong>Тип:</strong> {selectedPrompt.prompt_type}</div>
                  <div><strong>Версия:</strong> {selectedPrompt.version}</div>
                  <div><strong>Статус:</strong> {selectedPrompt.is_active ? 'Активен' : 'Неактивен'}</div>
                </div>
                
                <div>
                  <div className="font-medium mb-2">Содержимое промпта:</div>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap">{selectedPrompt.content}</pre>
                  </div>
                </div>

                {selectedPrompt.stats && (
                  <div className="text-sm bg-blue-50 p-3 rounded">
                    <div className="font-medium mb-2">Статистика использования:</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>Использований: {selectedPrompt.stats.usage_count}</div>
                      <div>Успешность: {(selectedPrompt.stats.success_rate * 100).toFixed(1)}%</div>
                      <div>Среднее время: {(selectedPrompt.stats.avg_response_time * 1000).toFixed(0)}ms</div>
                      <div>Последнее использование: {selectedPrompt.stats.last_used_at ? new Date(selectedPrompt.stats.last_used_at).toLocaleString('ru-RU') : 'Никогда'}</div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button onClick={() => {
                    setShowViewPrompt(false);
                    setSelectedPrompt(null);
                  }}>
                    Закрыть
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDemoPage; 