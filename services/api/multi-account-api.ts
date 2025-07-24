// Multi-Account API Service
// Сервис для работы с организациями и аккаунтами Binotel

import { axiosBase } from '@/lib/axios-config';
import type {
  Organization,
  BinotelAccount,
  BinotelAccountStats,
  CreateOrganizationData,
  UpdateOrganizationData,
  CreateBinotelAccountData,
  UpdateBinotelAccountData,
  OrganizationsResponse,
  BinotelAccountsResponse,
  AccountStatsResponse,
  OrganizationFilters,
  BinotelAccountFilters,
  OrganizationWithAccounts
} from '@/types/multi-account.types';

// Edge Function URLs
const EDGE_FUNCTION_BASE = 'https://rxwsvyiuwzfuyzxngbeh.supabase.co/functions/v1';
const BINOTEL_MANAGER_URL = `${EDGE_FUNCTION_BASE}/binotel-multi-account-manager`;

// =============================================================================
// ORGANIZATIONS API
// =============================================================================

export const organizationsApi = {
  /**
   * Получение списка организаций
   */
  async getAll(filters?: OrganizationFilters): Promise<Organization[]> {
    const params = new URLSearchParams();
    
    if (filters?.is_active !== undefined) {
      params.append('is_active', filters.is_active.toString());
    }
    if (filters?.search) {
      params.append('search', filters.search);
    }
    if (filters?.limit) {
      params.append('limit', filters.limit.toString());
    }
    if (filters?.offset) {
      params.append('offset', filters.offset.toString());
    }

    const url = `${BINOTEL_MANAGER_URL}/organizations${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await axiosBase.get<OrganizationsResponse>(url);
    
    if (!response.data.success) {
      throw new Error('Ошибка получения списка организаций');
    }
    
    return response.data.data;
  },

  /**
   * Получение организации по ID
   */
  async getById(id: string): Promise<Organization> {
    const response = await axiosBase.get<{success: boolean; data: Organization}>(
      `${BINOTEL_MANAGER_URL}/organizations/${id}`
    );
    
    if (!response.data.success) {
      throw new Error('Организация не найдена');
    }
    
    return response.data.data;
  },

  /**
   * Создание организации
   */
  async create(data: CreateOrganizationData): Promise<Organization> {
    const response = await axiosBase.post<{success: boolean; data: Organization}>(
      `${BINOTEL_MANAGER_URL}/organizations`,
      data
    );
    
    if (!response.data.success) {
      throw new Error('Ошибка создания организации');
    }
    
    return response.data.data;
  },

  /**
   * Обновление организации
   */
  async update(id: string, data: UpdateOrganizationData): Promise<Organization> {
    const response = await axiosBase.put<{success: boolean; data: Organization}>(
      `${BINOTEL_MANAGER_URL}/organizations/${id}`,
      data
    );
    
    if (!response.data.success) {
      throw new Error('Ошибка обновления организации');
    }
    
    return response.data.data;
  },

  /**
   * Удаление организации
   */
  async delete(id: string): Promise<void> {
    const response = await axiosBase.delete<{success: boolean}>(
      `${BINOTEL_MANAGER_URL}/organizations/${id}`
    );
    
    if (!response.data.success) {
      throw new Error('Ошибка удаления организации');
    }
  },

  /**
   * Получение организации с аккаунтами и статистикой
   */
  async getWithAccounts(id: string): Promise<OrganizationWithAccounts> {
    const response = await axiosBase.get<{success: boolean; data: OrganizationWithAccounts}>(
      `${BINOTEL_MANAGER_URL}/organizations/${id}/with-accounts`
    );
    
    if (!response.data.success) {
      throw new Error('Ошибка получения данных организации');
    }
    
    return response.data.data;
  }
};

// =============================================================================
// BINOTEL ACCOUNTS API
// =============================================================================

export const binotelAccountsApi = {
  /**
   * Получение списка аккаунтов Binotel
   */
  async getAll(filters?: BinotelAccountFilters): Promise<BinotelAccount[]> {
    const params = new URLSearchParams();
    
    if (filters?.organization_id) {
      params.append('organization_id', filters.organization_id);
    }
    if (filters?.is_active !== undefined) {
      params.append('is_active', filters.is_active.toString());
    }
    if (filters?.search) {
      params.append('search', filters.search);
    }
    if (filters?.limit) {
      params.append('limit', filters.limit.toString());
    }
    if (filters?.offset) {
      params.append('offset', filters.offset.toString());
    }

    const url = `${BINOTEL_MANAGER_URL}/accounts${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await axiosBase.get<BinotelAccountsResponse>(url);
    
    if (!response.data.success) {
      throw new Error('Ошибка получения списка аккаунтов Binotel');
    }
    
    return response.data.data;
  },

  /**
   * Получение аккаунта по ID
   */
  async getById(id: string): Promise<BinotelAccount> {
    const response = await axiosBase.get<{success: boolean; data: BinotelAccount}>(
      `${BINOTEL_MANAGER_URL}/accounts/${id}`
    );
    
    if (!response.data.success) {
      throw new Error('Аккаунт Binotel не найден');
    }
    
    return response.data.data;
  },

  /**
   * Создание аккаунта Binotel
   */
  async create(data: CreateBinotelAccountData): Promise<BinotelAccount> {
    const response = await axiosBase.post<{success: boolean; data: BinotelAccount}>(
      `${BINOTEL_MANAGER_URL}/accounts`,
      data
    );
    
    if (!response.data.success) {
      throw new Error('Ошибка создания аккаунта Binotel');
    }
    
    return response.data.data;
  },

  /**
   * Обновление аккаунта Binotel
   */
  async update(id: string, data: UpdateBinotelAccountData): Promise<BinotelAccount> {
    const response = await axiosBase.put<{success: boolean; data: BinotelAccount}>(
      `${BINOTEL_MANAGER_URL}/accounts/${id}`,
      data
    );
    
    if (!response.data.success) {
      throw new Error('Ошибка обновления аккаунта Binotel');
    }
    
    return response.data.data;
  },

  /**
   * Удаление аккаунта Binotel
   */
  async delete(id: string): Promise<void> {
    const response = await axiosBase.delete<{success: boolean}>(
      `${BINOTEL_MANAGER_URL}/accounts/${id}`
    );
    
    if (!response.data.success) {
      throw new Error('Ошибка удаления аккаунта Binotel');
    }
  },

  /**
   * Получение статистики аккаунтов
   */
  async getStats(organizationId?: string): Promise<BinotelAccountStats[]> {
    const params = new URLSearchParams();
    if (organizationId) {
      params.append('organization_id', organizationId);
    }

    const url = `${BINOTEL_MANAGER_URL}/accounts/stats${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await axiosBase.get<AccountStatsResponse>(url);
    
    if (!response.data.success) {
      throw new Error('Ошибка получения статистики аккаунтов');
    }
    
    return response.data.data;
  }
};

// =============================================================================
// CONVENIENCE FUNCTIONS
// =============================================================================

/**
 * Получение всех организаций с их аккаунтами
 */
export async function getOrganizationsWithAccounts(): Promise<OrganizationWithAccounts[]> {
  try {
    const organizations = await organizationsApi.getAll({ is_active: true });
    
    const organizationsWithAccounts = await Promise.all(
      organizations.map(async (org) => {
        try {
          return await organizationsApi.getWithAccounts(org.id);
        } catch (error) {
          console.warn(`Ошибка получения данных для организации ${org.id}:`, error);
          // Fallback to basic organization data
          return {
            ...org,
            binotel_accounts: [],
            total_calls: 0,
            active_accounts: 0
          };
        }
      })
    );
    
    return organizationsWithAccounts;
  } catch (error) {
    console.error('Ошибка получения организаций с аккаунтами:', error);
    throw error;
  }
}

/**
 * Проверка доступности аккаунта Binotel
 */
export async function testBinotelConnection(accountId: string): Promise<boolean> {
  try {
    const response = await axiosBase.post<{success: boolean}>(
      `${BINOTEL_MANAGER_URL}/accounts/${accountId}/test-connection`
    );
    
    return response.data.success;
  } catch (error) {
    console.error('Ошибка проверки подключения Binotel:', error);
    return false;
  }
} 