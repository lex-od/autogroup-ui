'use client';

import { FC, useState } from 'react';
import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useOrganizationsWithAccounts } from '@/services/api/queries/multi-account.queries';
import type { OrganizationWithAccounts } from '@/types/multi-account.types';

interface OrganizationSelectorProps {
  value?: string | null;
  onValueChange?: (organizationId: string | null, organization: OrganizationWithAccounts | null) => void;
  onCreateNew?: () => void;
  placeholder?: string;
  disabled?: boolean;
  showStats?: boolean;
  className?: string;
}

const OrganizationSelector: FC<OrganizationSelectorProps> = ({
  value,
  onValueChange,
  onCreateNew,
  placeholder = "Выберите организацию",
  disabled = false,
  showStats = true,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  
  const { 
    data: organizations = [], 
    isLoading, 
    error 
  } = useOrganizationsWithAccounts();

  const selectedOrganization = organizations.find(org => org.id === value);

  const handleSelect = (organizationId: string) => {
    if (organizationId === 'create-new') {
      onCreateNew?.();
      return;
    }
    
    const organization = organizations.find(org => org.id === organizationId);
    onValueChange?.(organizationId, organization || null);
    setOpen(false);
  };

  const handleClear = () => {
    onValueChange?.(null, null);
  };

  if (isLoading) {
    return (
      <div className={`space-y-2 ${className}`}>
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className}`}>
        <div className="rounded-md border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-600">
            Ошибка загрузки организаций: {error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Организация
        </label>
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="h-auto p-1 text-xs text-gray-500 hover:text-gray-700"
          >
            Очистить
          </Button>
        )}
      </div>

      <Select
        value={value || ''}
        onValueChange={handleSelect}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder}>
            {selectedOrganization && (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-start">
                  <span className="font-medium">
                    {selectedOrganization.name}
                  </span>
                  {showStats && (
                    <div className="flex gap-2 text-xs text-gray-500">
                      <span>{selectedOrganization.active_accounts} аккаунтов</span>
                      <span>•</span>
                      <span>{selectedOrganization.total_calls} звонков</span>
                    </div>
                  )}
                </div>
                {!selectedOrganization.is_active && (
                  <Badge variant="destructive" className="ml-auto">
                    Неактивна
                  </Badge>
                )}
              </div>
            )}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {/* Активные организации */}
          {organizations.filter(org => org.is_active).map((organization) => (
            <SelectItem
              key={organization.id}
              value={organization.id}
              className="cursor-pointer"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col items-start">
                  <span className="font-medium">
                    {organization.name}
                  </span>
                  {showStats && (
                    <div className="flex gap-2 text-xs text-gray-500">
                      <span>{organization.active_accounts} аккаунтов</span>
                      <span>•</span>
                      <span>{organization.total_calls} звонков</span>
                    </div>
                  )}
                </div>
                {value === organization.id && (
                  <Check className="h-4 w-4 text-blue-600" />
                )}
              </div>
            </SelectItem>
          ))}

          {/* Неактивные организации */}
          {organizations.filter(org => !org.is_active).length > 0 && (
            <>
              <div className="px-2 py-1.5 text-xs font-medium text-gray-500 bg-gray-50">
                Неактивные организации
              </div>
              {organizations.filter(org => !org.is_active).map((organization) => (
                <SelectItem
                  key={organization.id}
                  value={organization.id}
                  className="cursor-pointer opacity-60"
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-gray-600">
                        {organization.name}
                      </span>
                      {showStats && (
                        <div className="flex gap-2 text-xs text-gray-400">
                          <span>{organization.active_accounts} аккаунтов</span>
                          <span>•</span>
                          <span>{organization.total_calls} звонков</span>
                        </div>
                      )}
                    </div>
                    <Badge variant="destructive" className="ml-2">
                      Неактивна
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </>
          )}

          {/* Опция создания новой организации */}
          {onCreateNew && (
            <>
              <div className="px-2 py-1.5 border-t">
                <SelectItem
                  value="create-new"
                  className="cursor-pointer text-blue-600 hover:text-blue-700"
                >
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Создать новую организацию</span>
                  </div>
                </SelectItem>
              </div>
            </>
          )}

          {/* Пустой список */}
          {organizations.length === 0 && (
            <div className="px-2 py-6 text-center text-sm text-gray-500">
              <p>Организации не найдены</p>
              {onCreateNew && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onCreateNew}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Создать первую организацию
                </Button>
              )}
            </div>
          )}
        </SelectContent>
      </Select>

      {/* Описание выбранной организации */}
      {selectedOrganization?.description && (
        <p className="text-xs text-gray-600 mt-1">
          {selectedOrganization.description}
        </p>
      )}
    </div>
  );
};

export default OrganizationSelector; 