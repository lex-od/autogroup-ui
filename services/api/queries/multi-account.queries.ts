// React Query хуки для мультиаккаунтного управления
// Интеграция с TanStack Query v5

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  organizationsApi,
  binotelAccountsApi,
  getOrganizationsWithAccounts,
  testBinotelConnection
} from '../multi-account-api';
import type {
  Organization,
  BinotelAccount,
  BinotelAccountStats,
  CreateOrganizationData,
  UpdateOrganizationData,
  CreateBinotelAccountData,
  UpdateBinotelAccountData,
  OrganizationWithAccounts,
  OrganizationFilters,
  BinotelAccountFilters
} from '@/types/multi-account.types';

// =============================================================================
// QUERY KEYS
// =============================================================================

export const multiAccountKeys = {
  all: ['multi-account'] as const,
  organizations: () => [...multiAccountKeys.all, 'organizations'] as const,
  organization: (id: string) => [...multiAccountKeys.organizations(), id] as const,
  organizationsWithAccounts: () => [...multiAccountKeys.organizations(), 'with-accounts'] as const,
  binotelAccounts: () => [...multiAccountKeys.all, 'binotel-accounts'] as const,
  binotelAccount: (id: string) => [...multiAccountKeys.binotelAccounts(), id] as const,
  accountStats: (organizationId?: string) => 
    [...multiAccountKeys.binotelAccounts(), 'stats', organizationId] as const,
};

// =============================================================================
// ORGANIZATION QUERIES
// =============================================================================

/**
 * Получение списка организаций
 */
export function useOrganizations(filters?: OrganizationFilters) {
  return useQuery({
    queryKey: [...multiAccountKeys.organizations(), filters],
    queryFn: () => organizationsApi.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

/**
 * Получение конкретной организации
 */
export function useOrganization(id: string) {
  return useQuery({
    queryKey: multiAccountKeys.organization(id),
    queryFn: () => organizationsApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Получение организаций с аккаунтами и статистикой
 */
export function useOrganizationsWithAccounts() {
  return useQuery({
    queryKey: multiAccountKeys.organizationsWithAccounts(),
    queryFn: getOrganizationsWithAccounts,
    staleTime: 2 * 60 * 1000, // 2 минуты (статистика обновляется чаще)
  });
}

/**
 * Создание организации
 */
export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrganizationData) => organizationsApi.create(data),
    onSuccess: (newOrganization) => {
      // Обновляем кэш списка организаций
      queryClient.invalidateQueries({
        queryKey: multiAccountKeys.organizations(),
      });
      
      // Обновляем кэш организаций с аккаунтами
      queryClient.invalidateQueries({
        queryKey: multiAccountKeys.organizationsWithAccounts(),
      });

      toast.success(`Организация "${newOrganization.name}" создана успешно`);
    },
    onError: (error: Error) => {
      toast.error(`Ошибка создания организации: ${error.message}`);
    },
  });
}

/**
 * Обновление организации
 */
export function useUpdateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrganizationData }) =>
      organizationsApi.update(id, data),
    onSuccess: (updatedOrganization, { id }) => {
      // Обновляем кэш конкретной организации
      queryClient.setQueryData(
        multiAccountKeys.organization(id),
        updatedOrganization
      );
      
      // Обновляем кэш списка организаций
      queryClient.invalidateQueries({
        queryKey: multiAccountKeys.organizations(),
      });
      
      // Обновляем кэш организаций с аккаунтами
      queryClient.invalidateQueries({
        queryKey: multiAccountKeys.organizationsWithAccounts(),
      });

      toast.success(`Организация "${updatedOrganization.name}" обновлена`);
    },
    onError: (error: Error) => {
      toast.error(`Ошибка обновления организации: ${error.message}`);
    },
  });
}

/**
 * Удаление организации
 */
export function useDeleteOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => organizationsApi.delete(id),
    onSuccess: (_, id) => {
      // Удаляем из кэша конкретную организацию
      queryClient.removeQueries({
        queryKey: multiAccountKeys.organization(id),
      });
      
      // Обновляем кэш списка организаций
      queryClient.invalidateQueries({
        queryKey: multiAccountKeys.organizations(),
      });
      
      // Обновляем кэш организаций с аккаунтами
      queryClient.invalidateQueries({
        queryKey: multiAccountKeys.organizationsWithAccounts(),
      });

      toast.success('Организация удалена успешно');
    },
    onError: (error: Error) => {
      toast.error(`Ошибка удаления организации: ${error.message}`);
    },
  });
}

// =============================================================================
// BINOTEL ACCOUNTS QUERIES
// =============================================================================

/**
 * Получение списка аккаунтов Binotel
 */
export function useBinotelAccounts(filters?: BinotelAccountFilters) {
  return useQuery({
    queryKey: [...multiAccountKeys.binotelAccounts(), filters],
    queryFn: () => binotelAccountsApi.getAll(filters),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Получение конкретного аккаунта Binotel
 */
export function useBinotelAccount(id: string) {
  return useQuery({
    queryKey: multiAccountKeys.binotelAccount(id),
    queryFn: () => binotelAccountsApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Получение статистики аккаунтов
 */
export function useBinotelAccountStats(organizationId?: string) {
  return useQuery({
    queryKey: multiAccountKeys.accountStats(organizationId),
    queryFn: () => binotelAccountsApi.getStats(organizationId),
    staleTime: 2 * 60 * 1000, // 2 минуты для статистики
  });
}

/**
 * Создание аккаунта Binotel
 */
export function useCreateBinotelAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBinotelAccountData) => binotelAccountsApi.create(data),
    onSuccess: (newAccount) => {
      // Обновляем кэш списка аккаунтов
      queryClient.invalidateQueries({
        queryKey: multiAccountKeys.binotelAccounts(),
      });
      
      // Обновляем кэш организаций с аккаунтами
      queryClient.invalidateQueries({
        queryKey: multiAccountKeys.organizationsWithAccounts(),
      });
      
      // Обновляем статистику
      queryClient.invalidateQueries({
        queryKey: multiAccountKeys.accountStats(),
      });

      toast.success(`Аккаунт Binotel "${newAccount.account_name}" создан успешно`);
    },
    onError: (error: Error) => {
      toast.error(`Ошибка создания аккаунта Binotel: ${error.message}`);
    },
  });
}

/**
 * Обновление аккаунта Binotel
 */
export function useUpdateBinotelAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBinotelAccountData }) =>
      binotelAccountsApi.update(id, data),
    onSuccess: (updatedAccount, { id }) => {
      // Обновляем кэш конкретного аккаунта
      queryClient.setQueryData(
        multiAccountKeys.binotelAccount(id),
        updatedAccount
      );
      
      // Обновляем кэш списка аккаунтов
      queryClient.invalidateQueries({
        queryKey: multiAccountKeys.binotelAccounts(),
      });
      
      // Обновляем кэш организаций с аккаунтами
      queryClient.invalidateQueries({
        queryKey: multiAccountKeys.organizationsWithAccounts(),
      });

      toast.success(`Аккаунт "${updatedAccount.account_name}" обновлен`);
    },
    onError: (error: Error) => {
      toast.error(`Ошибка обновления аккаунта: ${error.message}`);
    },
  });
}

/**
 * Удаление аккаунта Binotel
 */
export function useDeleteBinotelAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => binotelAccountsApi.delete(id),
    onSuccess: (_, id) => {
      // Удаляем из кэша конкретный аккаунт
      queryClient.removeQueries({
        queryKey: multiAccountKeys.binotelAccount(id),
      });
      
      // Обновляем кэш списка аккаунтов
      queryClient.invalidateQueries({
        queryKey: multiAccountKeys.binotelAccounts(),
      });
      
      // Обновляем кэш организаций с аккаунтами
      queryClient.invalidateQueries({
        queryKey: multiAccountKeys.organizationsWithAccounts(),
      });

      toast.success('Аккаунт Binotel удален успешно');
    },
    onError: (error: Error) => {
      toast.error(`Ошибка удаления аккаунта: ${error.message}`);
    },
  });
}

/**
 * Тестирование подключения к аккаунту Binotel
 */
export function useTestBinotelConnection() {
  return useMutation({
    mutationFn: (accountId: string) => testBinotelConnection(accountId),
    onSuccess: (isConnected, accountId) => {
      if (isConnected) {
        toast.success('Подключение к Binotel успешно');
      } else {
        toast.error('Не удалось подключиться к аккаунту Binotel');
      }
    },
    onError: (error: Error) => {
      toast.error(`Ошибка тестирования подключения: ${error.message}`);
    },
  });
} 