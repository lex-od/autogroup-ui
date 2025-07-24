// Admin API Service
// Сервис для работы с административными функциями

import { axiosBase } from '@/lib/axios-config';
import type {
  UserProfile,
  CreateUserData,
  UpdateUserData,
  ApiConfiguration,
  CreateApiConfigData,
  UpdateApiConfigData,
  ModelConfiguration,
  CreateModelConfigData,
  UpdateModelConfigData,
  PromptConfiguration,
  CreatePromptData,
  UpdatePromptData,
  SystemSetting,
  UpdateSystemSettingData,
  SystemSettingsGroup,
  ProcessLog,
  TranscriptionLog,
  AuditLog,
  UsersResponse,
  ApiConfigurationsResponse,
  ModelConfigurationsResponse,
  PromptConfigurationsResponse,
  SystemSettingsResponse,
  LogsResponse,
  AdminDashboardStats,
  UserFilters,
  LogFilters,
  AuditLogFilters
} from '@/types/admin.types';

// Edge Function URLs (эти функции будут созданы позже)
const EDGE_FUNCTION_BASE = 'https://rxwsvyiuwzfuyzxngbeh.supabase.co/functions/v1';

// =============================================================================
// USER MANAGEMENT API
// =============================================================================

export const usersApi = {
  /**
   * Получение списка пользователей
   */
  async getAll(filters?: UserFilters): Promise<UserProfile[]> {
    const params = new URLSearchParams();
    
    if (filters?.role) params.append('role', filters.role);
    if (filters?.department) params.append('department', filters.department);
    if (filters?.is_active !== undefined) params.append('is_active', filters.is_active.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());

    // TODO: Заменить на реальный Edge Function когда будет готов
    // const url = `${EDGE_FUNCTION_BASE}/admin-users${params.toString() ? `?${params.toString()}` : ''}`;
    
    // Пока используем заглушку
    return mockUsers.filter(user => {
      if (filters?.role && user.role !== filters.role) return false;
      if (filters?.department && user.department !== filters.department) return false;
      if (filters?.is_active !== undefined && user.is_active !== filters.is_active) return false;
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        return user.email.toLowerCase().includes(searchLower) || 
               user.full_name?.toLowerCase().includes(searchLower);
      }
      return true;
    });
  },

  /**
   * Получение пользователя по ID
   */
  async getById(id: string): Promise<UserProfile> {
    // TODO: Заменить на реальный API
    const user = mockUsers.find(u => u.id === id);
    if (!user) throw new Error('Пользователь не найден');
    return user;
  },

  /**
   * Создание пользователя
   */
  async create(data: CreateUserData): Promise<UserProfile> {
    // TODO: Реализовать через Edge Function
    const newUser: UserProfile = {
      id: `user_${Date.now()}`,
      email: data.email,
      full_name: data.full_name,
      avatar_url: null,
      role: data.role,
      department: data.department || null,
      is_active: true,
      last_sign_in: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    mockUsers.push(newUser);
    return newUser;
  },

  /**
   * Обновление пользователя
   */
  async update(id: string, data: UpdateUserData): Promise<UserProfile> {
    // TODO: Реализовать через Edge Function
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) throw new Error('Пользователь не найден');
    
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...data,
      updated_at: new Date().toISOString(),
    };
    
    return mockUsers[userIndex];
  },

  /**
   * Удаление пользователя
   */
  async delete(id: string): Promise<void> {
    // TODO: Реализовать через Edge Function
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) throw new Error('Пользователь не найден');
    
    mockUsers.splice(userIndex, 1);
  }
};

// =============================================================================
// API CONFIGURATIONS API
// =============================================================================

export const apiConfigurationsApi = {
  /**
   * Получение всех API конфигураций
   */
  async getAll(): Promise<ApiConfiguration[]> {
    // TODO: Заменить на реальный Edge Function
    return mockApiConfigs;
  },

  /**
   * Создание API конфигурации
   */
  async create(data: CreateApiConfigData): Promise<ApiConfiguration> {
    // TODO: Реализовать через Edge Function
    const newConfig: ApiConfiguration = {
      id: `config_${Date.now()}`,
      service_name: data.service_name,
      api_key: data.api_key,
      api_secret: data.api_secret,
      endpoint_url: data.endpoint_url,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      usage_count: 0,
      configuration: data.configuration,
    };
    
    mockApiConfigs.push(newConfig);
    return newConfig;
  },

  /**
   * Обновление API конфигурации
   */
  async update(id: string, data: UpdateApiConfigData): Promise<ApiConfiguration> {
    // TODO: Реализовать через Edge Function
    const configIndex = mockApiConfigs.findIndex(c => c.id === id);
    if (configIndex === -1) throw new Error('Конфигурация не найдена');
    
    mockApiConfigs[configIndex] = {
      ...mockApiConfigs[configIndex],
      ...data,
      updated_at: new Date().toISOString(),
    };
    
    return mockApiConfigs[configIndex];
  },

  /**
   * Удаление API конфигурации
   */
  async delete(id: string): Promise<void> {
    // TODO: Реализовать через Edge Function
    const configIndex = mockApiConfigs.findIndex(c => c.id === id);
    if (configIndex === -1) throw new Error('Конфигурация не найдена');
    
    mockApiConfigs.splice(configIndex, 1);
  },

  /**
   * Тестирование API ключа
   */
  async testConnection(id: string): Promise<boolean> {
    // TODO: Реализовать через Edge Function
    return Math.random() > 0.2; // 80% успешных тестов
  }
};

// =============================================================================
// PROMPT CONFIGURATIONS API
// =============================================================================

export const promptConfigurationsApi = {
  /**
   * Получение всех промптов
   */
  async getAll(): Promise<PromptConfiguration[]> {
    // TODO: Заменить на реальный Edge Function
    return mockPrompts;
  },

  /**
   * Создание промпта
   */
  async create(data: CreatePromptData): Promise<PromptConfiguration> {
    // TODO: Реализовать через Edge Function
    const newPrompt: PromptConfiguration = {
      id: `prompt_${Date.now()}`,
      name: data.name,
      description: data.description || null,
      prompt_type: data.prompt_type,
      content: data.content,
      version: 1,
      is_active: true,
      created_by: 'current_user_id', // TODO: Получить из auth
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    mockPrompts.push(newPrompt);
    return newPrompt;
  },

  /**
   * Обновление промпта
   */
  async update(id: string, data: UpdatePromptData): Promise<PromptConfiguration> {
    // TODO: Реализовать через Edge Function
    const promptIndex = mockPrompts.findIndex(p => p.id === id);
    if (promptIndex === -1) throw new Error('Промпт не найден');
    
    // Увеличиваем версию при изменении содержимого
    const versionIncrement = data.content && data.content !== mockPrompts[promptIndex].content ? 1 : 0;
    
    mockPrompts[promptIndex] = {
      ...mockPrompts[promptIndex],
      ...data,
      version: mockPrompts[promptIndex].version + versionIncrement,
      updated_at: new Date().toISOString(),
    };
    
    return mockPrompts[promptIndex];
  },

  /**
   * Удаление промпта
   */
  async delete(id: string): Promise<void> {
    // TODO: Реализовать через Edge Function
    const promptIndex = mockPrompts.findIndex(p => p.id === id);
    if (promptIndex === -1) throw new Error('Промпт не найден');
    
    mockPrompts.splice(promptIndex, 1);
  }
};

// =============================================================================
// SYSTEM SETTINGS API
// =============================================================================

export const systemSettingsApi = {
  /**
   * Получение всех системных настроек
   */
  async getAll(): Promise<SystemSettingsGroup[]> {
    // TODO: Заменить на реальный Edge Function
    return mockSystemSettings;
  },

  /**
   * Обновление настройки
   */
  async updateSetting(key: string, data: UpdateSystemSettingData): Promise<SystemSetting> {
    // TODO: Реализовать через Edge Function
    for (const group of mockSystemSettings) {
      const settingIndex = group.settings.findIndex(s => s.setting_key === key);
      if (settingIndex !== -1) {
        group.settings[settingIndex] = {
          ...group.settings[settingIndex],
          setting_value: data.setting_value,
          description: data.description || group.settings[settingIndex].description,
          updated_at: new Date().toISOString(),
        };
        return group.settings[settingIndex];
      }
    }
    throw new Error('Настройка не найдена');
  }
};

// =============================================================================
// LOGS API
// =============================================================================

export const logsApi = {
  /**
   * Получение логов процессов
   */
  async getProcessLogs(filters?: LogFilters): Promise<ProcessLog[]> {
    // TODO: Заменить на реальный Edge Function
    return mockProcessLogs.filter(log => {
      if (filters?.service_name && log.service_name !== filters.service_name) return false;
      if (filters?.status && log.status !== filters.status) return false;
      // TODO: Добавить фильтрацию по датам и поиску
      return true;
    });
  },

  /**
   * Получение логов транскрипции
   */
  async getTranscriptionLogs(filters?: LogFilters): Promise<TranscriptionLog[]> {
    // TODO: Заменить на реальный Edge Function
    return mockTranscriptionLogs.filter(log => {
      if (filters?.service_name && log.service_name !== filters.service_name) return false;
      if (filters?.status && log.status !== filters.status) return false;
      return true;
    });
  },

  /**
   * Получение аудит логов
   */
  async getAuditLogs(filters?: AuditLogFilters): Promise<AuditLog[]> {
    // TODO: Заменить на реальный Edge Function
    return mockAuditLogs.filter(log => {
      if (filters?.user_id && log.user_id !== filters.user_id) return false;
      if (filters?.action && !log.action.includes(filters.action)) return false;
      if (filters?.resource_type && log.resource_type !== filters.resource_type) return false;
      return true;
    });
  }
};

// =============================================================================
// DASHBOARD API
// =============================================================================

export const adminDashboardApi = {
  /**
   * Получение статистики для админ дашборда
   */
  async getStats(): Promise<AdminDashboardStats> {
    // TODO: Заменить на реальный Edge Function
    return mockDashboardStats;
  }
};

// =============================================================================
// MOCK DATA (временные данные для разработки)
// =============================================================================

const mockUsers: UserProfile[] = [
  {
    id: 'user_1',
    email: 'admin@autogroup.ua',
    full_name: 'Системный Администратор',
    avatar_url: null,
    role: 'admin',
    department: 'IT',
    is_active: true,
    last_sign_in: '2025-01-23T10:00:00Z',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-23T10:00:00Z',
    stats: {
      total_calls: 0,
      calls_this_month: 0,
      avg_call_duration: 0,
      last_activity: '2025-01-23T10:00:00Z',
    }
  },
  {
    id: 'user_2',
    email: 'manager.sales@autogroup.ua',
    full_name: 'Менеджер Продаж',
    avatar_url: null,
    role: 'manager',
    department: 'Продажи',
    is_active: true,
    last_sign_in: '2025-01-23T09:30:00Z',
    created_at: '2025-01-15T00:00:00Z',
    updated_at: '2025-01-23T09:30:00Z',
    stats: {
      total_calls: 156,
      calls_this_month: 42,
      avg_call_duration: 8.5,
      last_activity: '2025-01-23T09:30:00Z',
    }
  }
];

const mockApiConfigs: ApiConfiguration[] = [
  {
    id: 'config_1',
    service_name: 'openai',
    api_key: 'sk-proj-***',
    endpoint_url: 'https://api.openai.com/v1',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-20T00:00:00Z',
    last_used_at: '2025-01-23T09:45:00Z',
    usage_count: 1250,
    configuration: {
      model: 'gpt-4o-mini',
      max_tokens: 4000,
      temperature: 0.1
    }
  },
  {
    id: 'config_2',
    service_name: 'groq',
    api_key: 'gsk_***',
    endpoint_url: 'https://api.groq.com/openai/v1',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-20T00:00:00Z',
    last_used_at: '2025-01-23T09:40:00Z',
    usage_count: 856,
    configuration: {
      model: 'whisper-large-v3-turbo',
      language: 'auto'
    }
  }
];

const mockPrompts: PromptConfiguration[] = [
  {
    id: 'prompt_1',
    name: 'AI Analysis Main',
    description: 'Основной промпт для AI анализа звонков',
    prompt_type: 'ai_analysis',
    content: 'Ты - эксперт по анализу деловых звонков...',
    version: 3,
    is_active: true,
    created_by: 'user_1',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-20T00:00:00Z',
    stats: {
      usage_count: 856,
      success_rate: 0.94,
      avg_response_time: 2.3,
      last_used_at: '2025-01-23T09:45:00Z'
    }
  }
];

const mockSystemSettings: SystemSettingsGroup[] = [
  {
    category: 'upload',
    title: 'Настройки загрузки',
    description: 'Параметры загрузки аудиофайлов',
    settings: [
      {
        id: 'setting_1',
        setting_key: 'max_file_size_mb',
        setting_value: 100,
        setting_type: 'number',
        description: 'Максимальный размер файла в MB',
        category: 'upload',
        is_public: false,
        created_at: '2025-01-01T00:00:00Z',
        updated_at: '2025-01-01T00:00:00Z',
      }
    ]
  }
];

const mockProcessLogs: ProcessLog[] = [
  {
    id: 'log_1',
    call_id: 'call_123',
    service_name: 'transcription-service',
    status: 'completed',
    message: 'Транскрипция завершена успешно',
    progress: 100,
    metadata: { wer_score: 0.05, confidence: 0.92 },
    created_at: '2025-01-23T09:45:00Z',
    processing_time_ms: 3420,
  }
];

const mockTranscriptionLogs: TranscriptionLog[] = [
  {
    id: 'tlog_1',
    call_id: 'call_123',
    service_name: 'groq',
    status: 'completed',
    error_message: null,
    processing_time_seconds: 3.42,
    audio_duration_seconds: 180,
    word_count: 245,
    confidence_score: 0.92,
    wer_score: 0.05,
    created_at: '2025-01-23T09:45:00Z',
  }
];

const mockAuditLogs: AuditLog[] = [
  {
    id: 'audit_1',
    user_id: 'user_1',
    action: 'update_api_config',
    resource_type: 'api_configuration',
    resource_id: 'config_1',
    old_values: { is_active: false },
    new_values: { is_active: true },
    ip_address: '192.168.1.100',
    user_agent: 'Mozilla/5.0...',
    created_at: '2025-01-23T09:30:00Z',
    user: {
      id: 'user_1',
      email: 'admin@autogroup.ua',
      full_name: 'Системный Администратор'
    }
  }
];

const mockDashboardStats: AdminDashboardStats = {
  users: {
    total: 25,
    active: 23,
    new_this_month: 3,
    by_role: {
      admin: 2,
      manager: 8,
      user: 12,
      viewer: 3
    }
  },
  system: {
    total_calls: 1456,
    calls_today: 89,
    storage_used_gb: 12.4,
    api_calls_today: 1250,
    error_rate_24h: 0.02
  },
  services: [
    {
      name: 'OpenAI API',
      status: 'online',
      last_check: '2025-01-23T09:50:00Z',
      response_time_ms: 234
    },
    {
      name: 'Groq API',
      status: 'online',
      last_check: '2025-01-23T09:50:00Z',
      response_time_ms: 156
    }
  ],
  recent_activity: mockAuditLogs
}; 