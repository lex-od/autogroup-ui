// Multi-Account Management Types
// Типы для управления организациями и аккаунтами Binotel

export interface Organization {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  settings: OrganizationSettings | null;
}

export interface OrganizationSettings {
  timezone?: string;
  currency?: string;
  language?: 'uk' | 'ru' | 'en';
  business_hours?: {
    start: string; // "09:00"
    end: string;   // "18:00"
    days: number[]; // [1,2,3,4,5] для пн-пт
  };
  notification_settings?: {
    email_alerts: boolean;
    slack_integration: boolean;
    webhook_url?: string;
  };
}

export interface BinotelAccount {
  id: string;
  organization_id: string;
  account_name: string;
  account_code: string;
  binotel_company_id: string | null;
  api_key: string;
  api_secret: string | null;
  webhook_url: string | null;
  is_active: boolean;
  allowed_ips: string[] | null;
  last_sync_at: string | null;
  created_at: string;
  updated_at: string;
  settings: BinotelAccountSettings | null;
  // Связанные данные
  organization?: Organization;
  stats?: BinotelAccountStats;
}

export interface BinotelAccountSettings {
  auto_transcription?: boolean;
  auto_analysis?: boolean;
  recording_retention_days?: number;
  quality_threshold?: number;
  notification_preferences?: {
    missed_calls: boolean;
    low_quality_calls: boolean;
    failed_analysis: boolean;
  };
}

export interface BinotelAccountStats {
  account_id: string;
  total_calls: number;
  calls_today: number;
  calls_this_week: number;
  calls_this_month: number;
  avg_call_duration: number;
  avg_sentiment_score: number;
  successful_transcriptions: number;
  failed_transcriptions: number;
  transcription_success_rate: number;
  last_call_at: string | null;
  generated_at: string;
}

// Форматы для создания и обновления
export interface CreateOrganizationData {
  name: string;
  description?: string;
  settings?: Partial<OrganizationSettings>;
}

export interface UpdateOrganizationData {
  name?: string;
  description?: string;
  is_active?: boolean;
  settings?: Partial<OrganizationSettings>;
}

export interface CreateBinotelAccountData {
  organization_id: string;
  account_name: string;
  account_code: string;
  binotel_company_id?: string;
  api_key: string;
  api_secret?: string;
  webhook_url?: string;
  allowed_ips?: string[];
  settings?: Partial<BinotelAccountSettings>;
}

export interface UpdateBinotelAccountData {
  account_name?: string;
  account_code?: string;
  binotel_company_id?: string;
  api_key?: string;
  api_secret?: string;
  webhook_url?: string;
  is_active?: boolean;
  allowed_ips?: string[];
  settings?: Partial<BinotelAccountSettings>;
}

// UI состояния
export interface MultiAccountState {
  selectedOrganization: Organization | null;
  selectedAccount: BinotelAccount | null;
  isLoading: boolean;
  error: string | null;
}

export interface OrganizationWithAccounts extends Organization {
  binotel_accounts: BinotelAccount[];
  total_calls: number;
  active_accounts: number;
}

// API Response типы
export interface OrganizationsResponse {
  success: boolean;
  data: Organization[];
  total: number;
}

export interface BinotelAccountsResponse {
  success: boolean;
  data: BinotelAccount[];
  total: number;
}

export interface AccountStatsResponse {
  success: boolean;
  data: BinotelAccountStats[];
}

// Filter и Search типы
export interface OrganizationFilters {
  is_active?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface BinotelAccountFilters {
  organization_id?: string;
  is_active?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
} 