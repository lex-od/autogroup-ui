import { FC, useState } from 'react';
import {
  Key,
  Plus,
  Eye,
  EyeOff,
  TestTube,
  CheckCircle,
  Clock,
  Activity,
  Settings,
  Trash2,
  Edit,
  AlertTriangle,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useApiConfigurations,
  useDeleteApiConfiguration,
  useTestApiConnection,
} from '../../admin-panel.mock-queries';
import type { ApiConfiguration } from '../../admin-panel.types';

interface Props {
  onCreateConfig?: () => void;
  onEditConfig?: (config: ApiConfiguration) => void;
  className?: string;
}

const ApiConfigurationManagementTab: FC<Props> = ({
  onCreateConfig,
  onEditConfig,
  className = '',
}) => {
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  const [deleteConfigId, setDeleteConfigId] = useState<string | null>(null);

  // API хуки
  const { data: configs = [], isLoading, error } = useApiConfigurations();
  const { mutate: deleteConfig, isPending: isDeleting } =
    useDeleteApiConfiguration();
  const { mutate: testConnection, isPending: isTesting } =
    useTestApiConnection();

  // Обработчики
  const toggleKeyVisibility = (configId: string) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [configId]: !prev[configId],
    }));
  };

  const handleDeleteConfig = (configId: string) => {
    deleteConfig(configId, {
      onSuccess: () => {
        setDeleteConfigId(null);
      },
    });
  };

  const handleTestConnection = (configId: string) => {
    testConnection(configId);
  };

  // Вспомогательные функции
  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return `${key.substring(0, 4)}***${key.substring(key.length - 4)}`;
  };

  const getServiceIcon = (serviceName: string) => {
    switch (serviceName.toLowerCase()) {
      case 'openai':
        return '🤖';
      case 'groq':
        return '⚡';
      case 'assemblyai':
        return '🎤';
      case 'gemini':
        return '💎';
      default:
        return '🔧';
    }
  };

  const getServiceColor = (serviceName: string) => {
    switch (serviceName.toLowerCase()) {
      case 'openai':
        return 'bg-green-100 text-green-800';
      case 'groq':
        return 'bg-blue-100 text-blue-800';
      case 'assemblyai':
        return 'bg-purple-100 text-purple-800';
      case 'gemini':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLastUsedText = (lastUsed: string | undefined) => {
    if (!lastUsed) return 'Не использовался';

    const date = new Date(lastUsed);
    const now = new Date();
    const diffHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffHours < 1) return 'Недавно';
    if (diffHours < 24) return `${diffHours} часов назад`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays} дней назад`;
    return date.toLocaleDateString('ru-RU');
  };

  // Статистика
  const stats = {
    total: configs.length,
    active: configs.filter((c) => c.is_active).length,
    recentlyUsed: configs.filter((c) => {
      if (!c.last_used_at) return false;
      const diffHours =
        (new Date().getTime() - new Date(c.last_used_at).getTime()) /
        (1000 * 60 * 60);
      return diffHours < 24;
    }).length,
    totalUsage: configs.reduce((sum, c) => sum + c.usage_count, 0),
  };

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <div className="text-center text-red-600">
            Ошибка загрузки API конфигураций: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Статистика */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего API</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активных</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.active}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Использованы сегодня
            </CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.recentlyUsed}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего вызовов</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {stats.totalUsage.toLocaleString('ru-RU')}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Основная панель */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Управление API конфигурациями
              </CardTitle>
              <CardDescription>
                Настройка API-ключей для внешних сервисов (OpenAI, Groq,
                AssemblyAI, Gemini)
              </CardDescription>
            </div>
            {onCreateConfig && (
              <Button onClick={onCreateConfig} className="gap-2">
                <Plus className="h-4 w-4" />
                Добавить API
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            // Скелетон загрузки
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-lg" />
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-4 w-48" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : configs.length === 0 ? (
            <div className="py-12 text-center">
              <Key className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <div className="mb-2 text-gray-500">
                API конфигурации не найдены
              </div>
              <div className="mb-4 text-sm text-gray-400">
                Добавьте API-ключи для работы с внешними сервисами
              </div>
              {onCreateConfig && (
                <Button onClick={onCreateConfig} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Добавить первый API
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {configs.map((config) => (
                <Card
                  key={config.id}
                  className="transition-shadow hover:shadow-md"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      {/* Информация о сервисе */}
                      <div className="flex items-center gap-4">
                        {/* Иконка сервиса */}
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-lg text-xl ${getServiceColor(config.service_name)}`}
                        >
                          {getServiceIcon(config.service_name)}
                        </div>

                        {/* Основная информация */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold capitalize">
                              {config.service_name}
                            </h3>
                            <Badge
                              variant={
                                config.is_active ? 'default' : 'secondary'
                              }
                            >
                              {config.is_active ? 'Активен' : 'Неактивен'}
                            </Badge>
                          </div>

                          {/* API ключ */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                              API Key:
                            </span>
                            <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">
                              {visibleKeys[config.id]
                                ? config.api_key
                                : maskApiKey(config.api_key)}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleKeyVisibility(config.id)}
                              className="h-6 w-6 p-0"
                            >
                              {visibleKeys[config.id] ? (
                                <EyeOff className="h-3 w-3" />
                              ) : (
                                <Eye className="h-3 w-3" />
                              )}
                            </Button>
                          </div>

                          {/* Статистика использования */}
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>
                              Вызовов:{' '}
                              {config.usage_count.toLocaleString('ru-RU')}
                            </span>
                            <span>•</span>
                            <span>
                              Последнее использование:{' '}
                              {getLastUsedText(config.last_used_at)}
                            </span>
                          </div>

                          {/* Endpoint URL */}
                          {config.endpoint_url && (
                            <div className="text-sm text-gray-500">
                              Endpoint: {config.endpoint_url}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Действия */}
                      <div className="flex items-center gap-2">
                        {/* Тест подключения */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTestConnection(config.id)}
                          disabled={isTesting || !config.is_active}
                          className="gap-2"
                        >
                          <TestTube className="h-4 w-4" />
                          {isTesting ? 'Тестируем...' : 'Тест'}
                        </Button>

                        {/* Меню действий */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {onEditConfig && (
                              <DropdownMenuItem
                                onClick={() => onEditConfig(config)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Редактировать
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => setDeleteConfigId(config.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Удалить
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Дополнительная конфигурация */}
                    {config.configuration &&
                      Object.keys(config.configuration).length > 0 && (
                        <div className="mt-4 border-t pt-4">
                          <div className="mb-2 text-sm text-gray-600">
                            Конфигурация:
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-4">
                            {Object.entries(config.configuration).map(
                              ([key, value]) => (
                                <div
                                  key={key}
                                  className="rounded bg-gray-50 px-2 py-1"
                                >
                                  <span className="font-medium">{key}:</span>{' '}
                                  {String(value)}
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                    {/* Предупреждения */}
                    {!config.is_active && (
                      <div className="mt-4 flex items-center gap-2 rounded bg-orange-50 p-2 text-orange-600">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm">
                          API конфигурация отключена и не используется системой
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Модалка подтверждения удаления */}
      {deleteConfigId && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-red-600">
                Подтверждение удаления
              </CardTitle>
              <CardDescription>
                Вы уверены, что хотите удалить эту API конфигурацию? Это может
                нарушить работу связанных сервисов.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setDeleteConfigId(null)}
                  disabled={isDeleting}
                >
                  Отмена
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteConfig(deleteConfigId)}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Удаление...' : 'Удалить'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ApiConfigurationManagementTab;
