'use client';

import { FC, useState } from 'react';
import { 
  LayoutDashboard,
  Users,
  Key,
  MessageSquare,
  Settings,
  Activity,
  FileText,
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import UserManagement from './user-management';
import ApiConfigurationManagement from './api-configuration-management';
import PromptManagement from './prompt-management';
import { useAdminDashboardStats } from '@/services/api/queries/admin.queries';
import type { UserProfile, ApiConfiguration, PromptConfiguration } from '@/types/admin.types';

interface AdminDashboardProps {
  // Обработчики для модалок создания/редактирования
  onCreateUser?: () => void;
  onEditUser?: (user: UserProfile) => void;
  onCreateApiConfig?: () => void;
  onEditApiConfig?: (config: ApiConfiguration) => void;
  onCreatePrompt?: () => void;
  onEditPrompt?: (prompt: PromptConfiguration) => void;
  onViewPrompt?: (prompt: PromptConfiguration) => void;
  className?: string;
}

type AdminTab = 'overview' | 'users' | 'api-keys' | 'prompts' | 'settings' | 'logs';

const AdminDashboard: FC<AdminDashboardProps> = ({
  onCreateUser,
  onEditUser,
  onCreateApiConfig,
  onEditApiConfig,
  onCreatePrompt,
  onEditPrompt,
  onViewPrompt,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // API хуки
  const { data: dashboardStats, isLoading: statsLoading, error: statsError } = useAdminDashboardStats();

  // Конфигурация табов
  const tabs = [
    {
      id: 'overview' as AdminTab,
      label: 'Обзор',
      icon: LayoutDashboard,
      description: 'Общая статистика системы'
    },
    {
      id: 'users' as AdminTab,
      label: 'Пользователи',
      icon: Users,
      description: 'Управление пользователями'
    },
    {
      id: 'api-keys' as AdminTab,
      label: 'API Ключи',
      icon: Key,
      description: 'Настройка внешних сервисов'
    },
    {
      id: 'prompts' as AdminTab,
      label: 'AI Промпты',
      icon: MessageSquare,
      description: 'Управление промптами'
    },
    {
      id: 'settings' as AdminTab,
      label: 'Настройки',
      icon: Settings,
      description: 'Системные настройки'
    },
    {
      id: 'logs' as AdminTab,
      label: 'Логи',
      icon: FileText,
      description: 'Системные логи'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'users':
        return (
          <UserManagement
            onCreateUser={onCreateUser}
            onEditUser={onEditUser}
          />
        );
      case 'api-keys':
        return (
          <ApiConfigurationManagement
            onCreateConfig={onCreateApiConfig}
            onEditConfig={onEditApiConfig}
          />
        );
      case 'prompts':
        return (
          <PromptManagement
            onCreatePrompt={onCreatePrompt}
            onEditPrompt={onEditPrompt}
            onViewPrompt={onViewPrompt}
          />
        );
      case 'settings':
        return renderSettings();
      case 'logs':
        return renderLogs();
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => {
    if (statsLoading) {
      return (
        <div className="space-y-6">
          {/* Скелетон статистики */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index}>
                <CardHeader className="space-y-0 pb-2">
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Скелетон графиков */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    if (statsError || !dashboardStats) {
      return (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              Ошибка загрузки статистики: {statsError?.message || 'Неизвестная ошибка'}
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-6">
        {/* Основные метрики */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Всего пользователей</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.users.total}</div>
              <p className="text-xs text-muted-foreground">
                +{dashboardStats.users.new_this_month} в этом месяце
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Звонков сегодня</CardTitle>
              <Activity className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{dashboardStats.system.calls_today}</div>
              <p className="text-xs text-muted-foreground">
                Всего: {dashboardStats.system.total_calls.toLocaleString('ru-RU')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Использовано хранилища</CardTitle>
              <FileText className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {dashboardStats.system.storage_used_gb.toFixed(1)} GB
              </div>
              <p className="text-xs text-muted-foreground">
                API вызовов: {dashboardStats.system.api_calls_today.toLocaleString('ru-RU')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Уровень ошибок</CardTitle>
              <AlertTriangle className={`h-4 w-4 ${dashboardStats.system.error_rate_24h > 0.05 ? 'text-red-600' : 'text-green-600'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${dashboardStats.system.error_rate_24h > 0.05 ? 'text-red-600' : 'text-green-600'}`}>
                {(dashboardStats.system.error_rate_24h * 100).toFixed(2)}%
              </div>
              <p className="text-xs text-muted-foreground">
                За последние 24 часа
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Пользователи по ролям */}
        <Card>
          <CardHeader>
            <CardTitle>Пользователи по ролям</CardTitle>
            <CardDescription>Распределение пользователей по уровням доступа</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{dashboardStats.users.by_role.admin}</div>
                <div className="text-sm text-gray-600">Администраторов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{dashboardStats.users.by_role.manager}</div>
                <div className="text-sm text-gray-600">Менеджеров</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{dashboardStats.users.by_role.user}</div>
                <div className="text-sm text-gray-600">Пользователей</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{dashboardStats.users.by_role.viewer}</div>
                <div className="text-sm text-gray-600">Наблюдателей</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Статус сервисов */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Статус внешних сервисов</CardTitle>
              <CardDescription>Состояние интеграций с AI сервисами</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardStats.services.map((service) => (
                  <div key={service.name} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        service.status === 'online' ? 'bg-green-500' :
                        service.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={service.status === 'online' ? 'default' : 'destructive'}>
                        {service.status === 'online' ? 'Онлайн' : 
                         service.status === 'degraded' ? 'Проблемы' : 'Офлайн'}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {service.response_time_ms}ms
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Последняя активность */}
          <Card>
            <CardHeader>
              <CardTitle>Последняя активность</CardTitle>
              <CardDescription>Недавние действия администраторов</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardStats.recent_activity.length === 0 ? (
                  <div className="text-center text-gray-500 py-4">
                    Недавняя активность отсутствует
                  </div>
                ) : (
                  dashboardStats.recent_activity.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm">
                          <span className="font-medium">{activity.user?.full_name || 'Неизвестный пользователь'}</span>
                          <span className="text-gray-600"> {activity.action} </span>
                          <span className="font-medium">{activity.resource_type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(activity.created_at).toLocaleString('ru-RU')}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle>Системные настройки</CardTitle>
        <CardDescription>Конфигурация системы (в разработке)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-gray-500">
          Раздел системных настроек в разработке
        </div>
      </CardContent>
    </Card>
  );

  const renderLogs = () => (
    <Card>
      <CardHeader>
        <CardTitle>Системные логи</CardTitle>
        <CardDescription>Логи процессов и аудита (в разработке)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-gray-500">
          Раздел просмотра логов в разработке
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Панель администратора</h1>
        <p className="text-gray-600 mt-1">
          Управление пользователями, настройка системы и мониторинг
        </p>
      </div>

      {/* Навигация по табам */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className={`-ml-0.5 mr-2 h-5 w-5 ${
                  isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                }`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Содержимое активного таба */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminDashboard; 