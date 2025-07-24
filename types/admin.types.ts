// Admin Panel Types
// Типы для административной панели управления системой

// =============================================================================
// USER MANAGEMENT
// =============================================================================

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  department: string | null;
  is_active: boolean;
  last_sign_in: string | null;
  created_at: string;
  updated_at: string;
  // Статистика пользователя
  stats?: {
    total_calls: number;
    calls_this_month: number;
    avg_call_duration: number;
    last_activity: string | null;
  };
}

export type UserRole = 'admin' | 'manager' | 'user' | 'viewer';

export interface CreateUserData {
  email: string;
  full_name: string;
  role: UserRole;
  department?: string;
  password?: string; // Для email/password пользователей
}

export interface UpdateUserData {
  full_name?: string;
  role?: UserRole;
  department?: string;
  is_active?: boolean;
}

// =============================================================================
// API KEY MANAGEMENT
// =============================================================================

export interface ApiConfiguration {
  id: string;
  service_name: string;
  api_key: string;
  api_secret?: string;
  endpoint_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_used_at?: string;
  usage_count: number;
  configuration?: Record<string, any>;
}

export interface CreateApiConfigData {
  service_name: string;
  api_key: string;
  api_secret?: string;
  endpoint_url?: string;
  configuration?: Record<string, any>;
}

export interface UpdateApiConfigData {
  api_key?: string;
  api_secret?: string;
  endpoint_url?: string;
  is_active?: boolean;
  configuration?: Record<string, any>;
}

// =============================================================================
// MODEL MANAGEMENT
// =============================================================================

export interface ModelConfiguration {
  id: string;
  model_type: 'transcription' | 'analysis' | 'postprocessing';
  service_name: string;
  model_name: string;
  is_default: boolean;
  is_active: boolean;
  priority: number;
  configuration: Record<string, any>;
  created_at: string;
  updated_at: string;
  // Статистика использования
  stats?: {
    usage_count: number;
    success_rate: number;
    avg_processing_time: number;
    last_used_at: string | null;
  };
}

export interface CreateModelConfigData {
  model_type: 'transcription' | 'analysis' | 'postprocessing';
  service_name: string;
  model_name: string;
  is_default?: boolean;
  priority?: number;
  configuration?: Record<string, any>;
}

export interface UpdateModelConfigData {
  model_name?: string;
  is_default?: boolean;
  is_active?: boolean;
  priority?: number;
  configuration?: Record<string, any>;
}

// =============================================================================
// PROMPT MANAGEMENT
// =============================================================================

export interface PromptConfiguration {
  id: string;
  name: string;
  description: string | null;
  prompt_type: 'ai_analysis' | 'role_processing' | 'summarization';
  content: string;
  version: number;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  // Статистика
  stats?: {
    usage_count: number;
    success_rate: number;
    avg_response_time: number;
    last_used_at: string | null;
  };
}

export interface CreatePromptData {
  name: string;
  description?: string;
  prompt_type: 'ai_analysis' | 'role_processing' | 'summarization';
  content: string;
}

export interface UpdatePromptData {
  name?: string;
  description?: string;
  content?: string;
  is_active?: boolean;
}

// =============================================================================
// SYSTEM SETTINGS
// =============================================================================

export interface SystemSetting {
  id: string;
  setting_key: string;
  setting_value: any;
  setting_type: 'string' | 'number' | 'boolean' | 'json';
  description: string | null;
  category: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface UpdateSystemSettingData {
  setting_value: any;
  description?: string;
}

// Группы настроек
export interface SystemSettingsGroup {
  category: string;
  title: string;
  description: string;
  settings: SystemSetting[];
}

// =============================================================================
// SYSTEM LOGS
// =============================================================================

export interface ProcessLog {
  id: string;
  call_id: string | null;
  service_name: string;
  status: 'started' | 'completed' | 'failed';
  message: string;
  progress: number | null;
  metadata: Record<string, any> | null;
  created_at: string;
  processing_time_ms: number | null;
}

export interface TranscriptionLog {
  id: string;
  call_id: string;
  service_name: string;
  status: 'started' | 'completed' | 'failed';
  error_message: string | null;
  processing_time_seconds: number | null;
  audio_duration_seconds: number | null;
  word_count: number | null;
  confidence_score: number | null;
  wer_score: number | null;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  resource_type: string;
  resource_id: string | null;
  old_values: Record<string, any> | null;
  new_values: Record<string, any> | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  // Связанные данные
  user?: Pick<UserProfile, 'id' | 'email' | 'full_name'>;
}

// =============================================================================
// FILTERS AND SEARCH
// =============================================================================

export interface UserFilters {
  role?: UserRole;
  department?: string;
  is_active?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface LogFilters {
  service_name?: string;
  status?: 'started' | 'completed' | 'failed';
  date_from?: string;
  date_to?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface AuditLogFilters {
  user_id?: string;
  action?: string;
  resource_type?: string;
  date_from?: string;
  date_to?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

// =============================================================================
// API RESPONSES
// =============================================================================

export interface UsersResponse {
  success: boolean;
  data: UserProfile[];
  total: number;
  limit: number;
  offset: number;
}

export interface ApiConfigurationsResponse {
  success: boolean;
  data: ApiConfiguration[];
  total: number;
}

export interface ModelConfigurationsResponse {
  success: boolean;
  data: ModelConfiguration[];
  total: number;
}

export interface PromptConfigurationsResponse {
  success: boolean;
  data: PromptConfiguration[];
  total: number;
}

export interface SystemSettingsResponse {
  success: boolean;
  data: SystemSettingsGroup[];
}

export interface LogsResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

// =============================================================================
// DASHBOARD STATS
// =============================================================================

export interface AdminDashboardStats {
  users: {
    total: number;
    active: number;
    new_this_month: number;
    by_role: Record<UserRole, number>;
  };
  system: {
    total_calls: number;
    calls_today: number;
    storage_used_gb: number;
    api_calls_today: number;
    error_rate_24h: number;
  };
  services: {
    name: string;
    status: 'online' | 'offline' | 'degraded';
    last_check: string;
    response_time_ms: number;
  }[];
  recent_activity: AuditLog[];
}

// =============================================================================
// UI STATE
// =============================================================================

export interface AdminState {
  selectedUser: UserProfile | null;
  selectedApiConfig: ApiConfiguration | null;
  selectedPrompt: PromptConfiguration | null;
  activeTab: string;
  isLoading: boolean;
  error: string | null;
} 