// Multi-Account Management Components
// Централизованный экспорт для удобного импорта

export { default as OrganizationSelector } from './organization-selector';
export { default as AccountSwitcher } from './account-switcher';
export { default as MultiAccountDashboard } from './multi-account-dashboard';

// Экспорт типов из queries для удобства
export { 
  useOrganizations,
  useOrganization,
  useOrganizationsWithAccounts,
  useCreateOrganization,
  useUpdateOrganization,
  useDeleteOrganization,
  useBinotelAccounts,
  useBinotelAccount,
  useBinotelAccountStats,
  useCreateBinotelAccount,
  useUpdateBinotelAccount,
  useDeleteBinotelAccount,
  useTestBinotelConnection,
  multiAccountKeys
} from '@/services/api/queries/multi-account.queries';

// Экспорт API для прямого использования
export {
  organizationsApi,
  binotelAccountsApi,
  getOrganizationsWithAccounts,
  testBinotelConnection
} from '@/services/api/multi-account-api';

// Экспорт типов
export type {
  Organization,
  BinotelAccount,
  BinotelAccountStats,
  CreateOrganizationData,
  UpdateOrganizationData,
  CreateBinotelAccountData,
  UpdateBinotelAccountData,
  OrganizationWithAccounts,
  OrganizationFilters,
  BinotelAccountFilters,
  MultiAccountState
} from '@/types/multi-account.types'; 