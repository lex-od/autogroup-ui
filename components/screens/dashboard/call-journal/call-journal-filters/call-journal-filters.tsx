import { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DateRangePicker } from '@/components/ui/date-range-picker.legacy';
import { CallType } from '@/services/api/calls-api';
import SelectBasic from '@/components/ui-custom/select-basic';
import { callTypeOptions } from './call-journal-filters.utils';

interface Props {
  dateFrom: string;
  dateTo: string;
  onDateRangeChange: (dateFrom: string, dateTo: string) => void;
  callType: CallType | 'all';
  onCallTypeChange: (callType: CallType | 'all') => void;
}

const CallJournalFilters: FC<Props> = ({
  dateFrom,
  dateTo,
  onDateRangeChange,
  callType,
  onCallTypeChange,
}) => {
  return (
    <Card className="bg-muted/30 py-4">
      <CardContent className="px-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {/* Период дат - двойной календарь */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Период</label>
            <DateRangePicker
              value={{
                from: dateFrom,
                to: dateTo,
              }}
              onChange={(range) => onDateRangeChange(range.from, range.to)}
              placeholder="Выберите период"
              className="w-full"
            />
          </div>

          {/* Тип */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Тип</label>
            <SelectBasic
              value={callType}
              onValueChange={onCallTypeChange}
              options={callTypeOptions}
              triggerProps={{
                className: 'w-full',
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallJournalFilters;
