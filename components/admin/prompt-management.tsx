'use client';

import { FC, useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Edit,
  Trash2,
  Eye,
  History,
  Play,
  Pause,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertCircle,
  Code
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  usePromptConfigurations,
  useDeletePromptConfiguration,
  useActivePromptsByType
} from '@/services/api/queries/admin.queries';
import type { PromptConfiguration } from '@/types/admin.types';

interface PromptManagementProps {
  onCreatePrompt?: () => void;
  onEditPrompt?: (prompt: PromptConfiguration) => void;
  onViewPrompt?: (prompt: PromptConfiguration) => void;
  className?: string;
}

const PromptManagement: FC<PromptManagementProps> = ({
  onCreatePrompt,
  onEditPrompt,
  onViewPrompt,
  className = '',
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [deletePromptId, setDeletePromptId] = useState<string | null>(null);

  // API хуки
  const { data: prompts = [], isLoading, error } = usePromptConfigurations();
  const { mutate: deletePrompt, isPending: isDeleting } = useDeletePromptConfiguration();
  const activePrompts = useActivePromptsByType();

  // Фильтрация промптов
  const filteredPrompts = filterType === 'all' 
    ? prompts 
    : prompts.filter(prompt => prompt.prompt_type === filterType);

  // Обработчики
  const handleDeletePrompt = (promptId: string) => {
    deletePrompt(promptId, {
      onSuccess: () => {
        setDeletePromptId(null);
      }
    });
  };

  // Вспомогательные функции
  const getPromptTypeDisplayName = (type: string) => {
    switch (type) {
      case 'ai_analysis': return 'AI Анализ';
      case 'role_processing': return 'Обработка ролей';
      case 'summarization': return 'Суммаризация';
      default: return type;
    }
  };

  const getPromptTypeColor = (type: string) => {
    switch (type) {
      case 'ai_analysis': return 'bg-blue-100 text-blue-800';
      case 'role_processing': return 'bg-green-100 text-green-800';
      case 'summarization': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPromptTypeIcon = (type: string) => {
    switch (type) {
      case 'ai_analysis': return '🧠';
      case 'role_processing': return '👥';
      case 'summarization': return '📄';
      default: return '💬';
    }
  };

  const formatResponseTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 0.95) return 'text-green-600';
    if (rate >= 0.9) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Статистика
  const stats = {
    total: prompts.length,
    active: prompts.filter(p => p.is_active).length,
    byType: {
      ai_analysis: prompts.filter(p => p.prompt_type === 'ai_analysis').length,
      role_processing: prompts.filter(p => p.prompt_type === 'role_processing').length,
      summarization: prompts.filter(p => p.prompt_type === 'summarization').length,
    }
  };

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <div className="text-center text-red-600">
            Ошибка загрузки промптов: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего промптов</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активных</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Анализ</CardTitle>
            <div className="text-lg">🧠</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.byType.ai_analysis}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Обработка ролей</CardTitle>
            <div className="text-lg">👥</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.byType.role_processing}</div>
          </CardContent>
        </Card>
      </div>

      {/* Основная панель */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Управление AI-промптами
              </CardTitle>
              <CardDescription>
                Создание, редактирование и версионирование промптов для AI-модулей
              </CardDescription>
            </div>
            {onCreatePrompt && (
              <Button onClick={onCreatePrompt} className="gap-2">
                <Plus className="h-4 w-4" />
                Создать промпт
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {/* Фильтры */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Тип:</span>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  <SelectItem value="ai_analysis">AI Анализ</SelectItem>
                  <SelectItem value="role_processing">Обработка ролей</SelectItem>
                  <SelectItem value="summarization">Суммаризация</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Список промптов */}
          {isLoading ? (
            // Скелетон загрузки
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <Skeleton className="h-12 w-12 rounded-lg" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-6 w-48" />
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-16 w-full" />
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
          ) : filteredPrompts.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="text-gray-500 mb-2">
                {filterType === 'all' ? 'Промпты не найдены' : `Промпты типа "${getPromptTypeDisplayName(filterType)}" не найдены`}
              </div>
              {onCreatePrompt && (
                <Button onClick={onCreatePrompt} className="gap-2 mt-4">
                  <Plus className="h-4 w-4" />
                  Создать промпт
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPrompts.map((prompt) => (
                <Card key={prompt.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      {/* Основная информация */}
                      <div className="flex items-start gap-4 flex-1">
                        {/* Иконка типа */}
                        <div className={`h-12 w-12 rounded-lg flex items-center justify-center text-xl ${getPromptTypeColor(prompt.prompt_type)}`}>
                          {getPromptTypeIcon(prompt.prompt_type)}
                        </div>

                        {/* Детали промпта */}
                        <div className="space-y-2 flex-1">
                          {/* Заголовок и статус */}
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{prompt.name}</h3>
                            <Badge variant={prompt.is_active ? 'default' : 'secondary'}>
                              {prompt.is_active ? 'Активен' : 'Неактивен'}
                            </Badge>
                            <Badge variant="outline" className={getPromptTypeColor(prompt.prompt_type)}>
                              {getPromptTypeDisplayName(prompt.prompt_type)}
                            </Badge>
                          </div>

                          {/* Описание */}
                          {prompt.description && (
                            <p className="text-sm text-gray-600">{prompt.description}</p>
                          )}

                          {/* Превью содержимого */}
                          <div className="bg-gray-50 rounded p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Code className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium text-gray-700">Содержимое промпта:</span>
                            </div>
                            <div className="text-sm font-mono text-gray-600 line-clamp-3">
                              {prompt.content.length > 200 
                                ? `${prompt.content.substring(0, 200)}...` 
                                : prompt.content
                              }
                            </div>
                            {prompt.content.length > 200 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onViewPrompt?.(prompt)}
                                className="mt-2 h-6 text-xs"
                              >
                                Показать полностью
                              </Button>
                            )}
                          </div>

                          {/* Метаинформация */}
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <History className="h-3 w-3" />
                              <span>Версия {prompt.version}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>
                                Создан {new Date(prompt.created_at).toLocaleDateString('ru-RU')}
                              </span>
                            </div>
                            {prompt.updated_at !== prompt.created_at && (
                              <>
                                <span>•</span>
                                <span>
                                  Обновлен {new Date(prompt.updated_at).toLocaleDateString('ru-RU')}
                                </span>
                              </>
                            )}
                          </div>

                          {/* Статистика использования */}
                          {prompt.stats && (
                            <div className="flex items-center gap-6 text-sm">
                              <div className="flex items-center gap-1">
                                <BarChart3 className="h-3 w-3 text-blue-500" />
                                <span>Использований: {prompt.stats.usage_count.toLocaleString('ru-RU')}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CheckCircle2 className={`h-3 w-3 ${getSuccessRateColor(prompt.stats.success_rate)}`} />
                                <span className={getSuccessRateColor(prompt.stats.success_rate)}>
                                  Успешность: {(prompt.stats.success_rate * 100).toFixed(1)}%
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-gray-500" />
                                <span>
                                  Среднее время: {formatResponseTime(prompt.stats.avg_response_time * 1000)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Действия */}
                      <div className="flex flex-col gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Edit className="h-4 w-4" />
                              Действия
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {onViewPrompt && (
                              <DropdownMenuItem onClick={() => onViewPrompt(prompt)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Просмотр
                              </DropdownMenuItem>
                            )}
                            {onEditPrompt && (
                              <DropdownMenuItem onClick={() => onEditPrompt(prompt)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Редактировать
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              onClick={() => setDeletePromptId(prompt.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Удалить
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Статус активности */}
                        {prompt.is_active ? (
                          <div className="flex items-center gap-1 text-xs text-green-600">
                            <Play className="h-3 w-3" />
                            <span>Используется</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Pause className="h-3 w-3" />
                            <span>Отключен</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Модалка подтверждения удаления */}
      {deletePromptId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-red-600">Подтверждение удаления</CardTitle>
              <CardDescription>
                Вы уверены, что хотите удалить этот промпт? 
                Это может повлиять на качество AI-анализа.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setDeletePromptId(null)}
                  disabled={isDeleting}
                >
                  Отмена
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeletePrompt(deletePromptId)}
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

export default PromptManagement; 