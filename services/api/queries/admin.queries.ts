// Admin Panel React Query Hooks
// Хуки для работы с данными административной панели

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  usersApi,
  apiConfigurationsApi,
  promptConfigurationsApi,
  systemSettingsApi,
  logsApi,
  adminDashboardApi
} from '../admin-api';
import type {
  UserProfile,
  CreateUserData,
  UpdateUserData,
  ApiConfiguration,
  CreateApiConfigData,
  UpdateApiConfigData,
  PromptConfiguration,
  CreatePromptData,
  UpdatePromptData,
  SystemSetting,
  UpdateSystemSettingData,
  SystemSettingsGroup,
  ProcessLog,
  TranscriptionLog,
  AuditLog,
  AdminDashboardStats,
  UserFilters,
  LogFilters,
  AuditLogFilters
} from '@/types/admin.types';

// =============================================================================
// QUERY KEYS
// =============================================================================

export const adminKeys = {
  all: ['admin'] as const,
  
  // Users
  users: () => [...adminKeys.all, 'users'] as const,
  user: (id: string) => [...adminKeys.users(), id] as const,
  
  // API Configurations
  apiConfigs: () => [...adminKeys.all, 'api-configs'] as const,
  apiConfig: (id: string) => [...adminKeys.apiConfigs(), id] as const,
  
  // Prompts
  prompts: () => [...adminKeys.all, 'prompts'] as const,
  prompt: (id: string) => [...adminKeys.prompts(), id] as const,
  
  // System Settings
  systemSettings: () => [...adminKeys.all, 'system-settings'] as const,
  
  // Logs
  logs: () => [...adminKeys.all, 'logs'] as const,
  processLogs: (filters?: LogFilters) => [...adminKeys.logs(), 'process', filters] as const,
  transcriptionLogs: (filters?: LogFilters) => [...adminKeys.logs(), 'transcription', filters] as const,
  auditLogs: (filters?: AuditLogFilters) => [...adminKeys.logs(), 'audit', filters] as const,
  
  // Dashboard
  dashboard: () => [...adminKeys.all, 'dashboard'] as const,
  dashboardStats: () => [...adminKeys.dashboard(), 'stats'] as const,
};

// =============================================================================
// USER MANAGEMENT QUERIES
// =============================================================================

/**
 * Получение списка пользователей
 */
export function useUsers(filters?: UserFilters) {
  return useQuery({
    queryKey: [...adminKeys.users(), filters],
    queryFn: () => usersApi.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

/**
 * Получение конкретного пользователя
 */
export function useUser(id: string) {
  return useQuery({
    queryKey: adminKeys.user(id),
    queryFn: () => usersApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Создание пользователя
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserData) => usersApi.create(data),
    onSuccess: (newUser) => {
      // Обновляем кэш списка пользователей
      queryClient.invalidateQueries({
        queryKey: adminKeys.users(),
      });

      toast.success(`Пользователь "${newUser.full_name}" создан успешно`);
    },
    onError: (error: Error) => {
      toast.error(`Ошибка создания пользователя: ${error.message}`);
    },
  });
}

/**
 * Обновление пользователя
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserData }) =>
      usersApi.update(id, data),
    onSuccess: (updatedUser, { id }) => {
      // Обновляем кэш конкретного пользователя
      queryClient.setQueryData(
        adminKeys.user(id),
        updatedUser
      );
      
      // Обновляем кэш списка пользователей
      queryClient.invalidateQueries({
        queryKey: adminKeys.users(),
      });

      toast.success(`Пользователь "${updatedUser.full_name}" обновлен`);
    },
    onError: (error: Error) => {
      toast.error(`Ошибка обновления пользователя: ${error.message}`);
    },
  });
}

/**
 * Удаление пользователя
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersApi.delete(id),
    onSuccess: (_, id) => {
      // Удаляем из кэша конкретного пользователя
      queryClient.removeQueries({
        queryKey: adminKeys.user(id),
      });
      
      // Обновляем кэш списка пользователей
      queryClient.invalidateQueries({
        queryKey: adminKeys.users(),
      });

      toast.success('Пользователь удален успешно');
    },
    onError: (error: Error) => {
      toast.error(`Ошибка удаления пользователя: ${error.message}`);
    },
  });
}

// =============================================================================
// API CONFIGURATIONS QUERIES
// =============================================================================

/**
 * Получение API конфигураций
 */
export function useApiConfigurations() {
  return useQuery({
    queryKey: adminKeys.apiConfigs(),
    queryFn: () => apiConfigurationsApi.getAll(),
    staleTime: 2 * 60 * 1000, // 2 минуты
  });
}

/**
 * Создание API конфигурации
 */
export function useCreateApiConfiguration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateApiConfigData) => apiConfigurationsApi.create(data),
    onSuccess: (newConfig) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.apiConfigs(),
      });

      toast.success(`API конфигурация "${newConfig.service_name}" создана`);
    },
    onError: (error: Error) => {
      toast.error(`Ошибка создания API конфигурации: ${error.message}`);
    },
  });
}

/**
 * Обновление API конфигурации
 */
export function useUpdateApiConfiguration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateApiConfigData }) =>
      apiConfigurationsApi.update(id, data),
    onSuccess: (updatedConfig) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.apiConfigs(),
      });

      toast.success(`API конфигурация "${updatedConfig.service_name}" обновлена`);
    },
    onError: (error: Error) => {
      toast.error(`Ошибка обновления API конфигурации: ${error.message}`);
    },
  });
}

/**
 * Удаление API конфигурации
 */
export function useDeleteApiConfiguration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiConfigurationsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.apiConfigs(),
      });

      toast.success('API конфигурация удалена');
    },
    onError: (error: Error) => {
      toast.error(`Ошибка удаления API конфигурации: ${error.message}`);
    },
  });
}

/**
 * Тестирование API подключения
 */
export function useTestApiConnection() {
  return useMutation({
    mutationFn: (id: string) => apiConfigurationsApi.testConnection(id),
    onSuccess: (isConnected) => {
      if (isConnected) {
        toast.success('Подключение к API успешно');
      } else {
        toast.error('Не удалось подключиться к API');
      }
    },
    onError: (error: Error) => {
      toast.error(`Ошибка тестирования подключения: ${error.message}`);
    },
  });
}

// =============================================================================
// PROMPT CONFIGURATIONS QUERIES
// =============================================================================

/**
 * Получение промптов
 */
export function usePromptConfigurations() {
  return useQuery({
    queryKey: adminKeys.prompts(),
    queryFn: () => promptConfigurationsApi.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Создание промпта
 */
export function useCreatePromptConfiguration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePromptData) => promptConfigurationsApi.create(data),
    onSuccess: (newPrompt) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.prompts(),
      });

      toast.success(`Промпт "${newPrompt.name}" создан`);
    },
    onError: (error: Error) => {
      toast.error(`Ошибка создания промпта: ${error.message}`);
    },
  });
}

/**
 * Обновление промпта
 */
export function useUpdatePromptConfiguration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePromptData }) =>
      promptConfigurationsApi.update(id, data),
    onSuccess: (updatedPrompt) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.prompts(),
      });

      toast.success(`Промпт "${updatedPrompt.name}" обновлен (версия ${updatedPrompt.version})`);
    },
    onError: (error: Error) => {
      toast.error(`Ошибка обновления промпта: ${error.message}`);
    },
  });
}

/**
 * Удаление промпта
 */
export function useDeletePromptConfiguration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => promptConfigurationsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.prompts(),
      });

      toast.success('Промпт удален');
    },
    onError: (error: Error) => {
      toast.error(`Ошибка удаления промпта: ${error.message}`);
    },
  });
}

// =============================================================================
// SYSTEM SETTINGS QUERIES
// =============================================================================

/**
 * Получение системных настроек
 */
export function useSystemSettings() {
  return useQuery({
    queryKey: adminKeys.systemSettings(),
    queryFn: () => systemSettingsApi.getAll(),
    staleTime: 10 * 60 * 1000, // 10 минут - настройки обновляются редко
  });
}

/**
 * Обновление системной настройки
 */
export function useUpdateSystemSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ key, data }: { key: string; data: UpdateSystemSettingData }) =>
      systemSettingsApi.updateSetting(key, data),
    onSuccess: (updatedSetting) => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.systemSettings(),
      });

      toast.success(`Настройка "${updatedSetting.setting_key}" обновлена`);
    },
    onError: (error: Error) => {
      toast.error(`Ошибка обновления настройки: ${error.message}`);
    },
  });
}

// =============================================================================
// LOGS QUERIES
// =============================================================================

/**
 * Получение логов процессов
 */
export function useProcessLogs(filters?: LogFilters) {
  return useQuery({
    queryKey: adminKeys.processLogs(filters),
    queryFn: () => logsApi.getProcessLogs(filters),
    staleTime: 30 * 1000, // 30 секунд - логи обновляются часто
  });
}

/**
 * Получение логов транскрипции
 */
export function useTranscriptionLogs(filters?: LogFilters) {
  return useQuery({
    queryKey: adminKeys.transcriptionLogs(filters),
    queryFn: () => logsApi.getTranscriptionLogs(filters),
    staleTime: 30 * 1000,
  });
}

/**
 * Получение аудит логов
 */
export function useAuditLogs(filters?: AuditLogFilters) {
  return useQuery({
    queryKey: adminKeys.auditLogs(filters),
    queryFn: () => logsApi.getAuditLogs(filters),
    staleTime: 60 * 1000, // 1 минута
  });
}

// =============================================================================
// DASHBOARD QUERIES
// =============================================================================

/**
 * Получение статистики админ дашборда
 */
export function useAdminDashboardStats() {
  return useQuery({
    queryKey: adminKeys.dashboardStats(),
    queryFn: () => adminDashboardApi.getStats(),
    staleTime: 2 * 60 * 1000, // 2 минуты
    refetchInterval: 5 * 60 * 1000, // Автообновление каждые 5 минут
  });
}

// =============================================================================
// CONVENIENCE HOOKS
// =============================================================================

/**
 * Хук для получения статистики пользователей по ролям
 */
export function useUserStatsByRole() {
  const { data: users = [] } = useUsers();
  
  const stats = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.is_active).length,
    statsByRole: stats,
  };
}

/**
 * Хук для получения активных API конфигураций
 */
export function useActiveApiConfigurations() {
  const { data: apiConfigs = [] } = useApiConfigurations();
  
  return {
    all: apiConfigs,
    active: apiConfigs.filter(config => config.is_active),
    byService: apiConfigs.reduce((acc, config) => {
      acc[config.service_name] = config;
      return acc;
    }, {} as Record<string, ApiConfiguration>),
  };
}

/**
 * Хук для получения активных промптов по типам
 */
export function useActivePromptsByType() {
  const { data: prompts = [] } = usePromptConfigurations();
  
  return {
    all: prompts,
    active: prompts.filter(prompt => prompt.is_active),
    byType: prompts.reduce((acc, prompt) => {
      if (!acc[prompt.prompt_type]) {
        acc[prompt.prompt_type] = [];
      }
      acc[prompt.prompt_type].push(prompt);
      return acc;
    }, {} as Record<string, PromptConfiguration[]>),
  };
} 