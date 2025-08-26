import { DateRange } from 'react-day-picker';
import { endOfDay } from 'date-fns';
import { SelectBasicOption } from '@/components/ui-custom/select-basic';

export const callTypeOptions: SelectBasicOption[] = [
  { value: 'all', label: 'Все типы' },
  { value: 'incoming', label: 'Входящий' },
  { value: 'outgoing', label: 'Исходящий' },
];

export const getInclusiveRange = (dateRange?: DateRange) => {
  if (!dateRange) {
    return undefined;
  }
  return {
    from: dateRange.from,
    to: dateRange.to ? endOfDay(dateRange.to) : undefined,
  };
};
