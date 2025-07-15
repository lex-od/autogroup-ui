import { FC, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Card, CardContent } from '@/components/ui/card';
import { CallType } from '@/services/api/calls-api';
import SelectBasic from '@/components/ui-custom/select-basic';
import DateRangePicker from '@/components/ui-custom/date-range-picker';
import { callTypeOptions } from './call-journal-filters.utils';

interface Props {
  dateRange?: DateRange;
  onDateRangeChange: (dateRange?: DateRange) => void;
  callType: CallType | 'all';
  onCallTypeChange: (callType: CallType | 'all') => void;
}

const CallJournalFilters: FC<Props> = ({
  dateRange,
  onDateRangeChange,
  callType,
  onCallTypeChange,
}) => {
  const [isRangeOpen, setIsRangeOpen] = useState(false);

  return (
    <Card className="bg-muted/30 py-4">
      <CardContent className="px-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {/* Период (календарь) */}
          <DateRangePicker
            open={isRangeOpen}
            onOpenChange={setIsRangeOpen}
            dateRange={dateRange}
            onDateRangeChange={onDateRangeChange}
            label="Выберите период"
          />

          {/* Тип звонка */}
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
