// Admin Panel Components
// Централизованный экспорт для удобного импорта

export { default as AdminDashboard } from './admin-dashboard';
export { default as UserManagement } from './user-management';
export { default as ApiConfigurationManagement } from './api-configuration-management';
export { default as PromptManagement } from './prompt-management';

// Экспорт хуков для админ-панели
export {
  // Users
  useUsers,
  useUser,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  useUserStatsByRole,
  
  // API Configurations
  useApiConfigurations,
  useCreateApiConfiguration,
  useUpdateApiConfiguration,
  useDeleteApiConfiguration,
  useTestApiConnection,
  useActiveApiConfigurations,
  
  // Prompts
  usePromptConfigurations,
  useCreatePromptConfiguration,
  useUpdatePromptConfiguration,
  useDeletePromptConfiguration,
  useActivePromptsByType,
  
  // System Settings
  useSystemSettings,
  useUpdateSystemSetting,
  
  // Logs
  useProcessLogs,
  useTranscriptionLogs,
  useAuditLogs,
  
  // Dashboard
  useAdminDashboardStats,
  
  // Keys
  adminKeys
} from '@/services/api/queries/admin.queries';

// Экспорт API для прямого использования
export {
  usersApi,
  apiConfigurationsApi,
  promptConfigurationsApi,
  systemSettingsApi,
  logsApi,
  adminDashboardApi
} from '@/services/api/admin-api';

// Экспорт типов
export type {
  UserProfile,
  CreateUserData,
  UpdateUserData,
  UserRole,
  UserFilters,
  
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
  LogFilters,
  AuditLogFilters,
  
  AdminDashboardStats,
  AdminState,
  
  UsersResponse,
  ApiConfigurationsResponse,
  ModelConfigurationsResponse,
  PromptConfigurationsResponse,
  SystemSettingsResponse,
  LogsResponse
} from '@/types/admin.types'; 