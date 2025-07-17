import { FC, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Card, CardContent } from '@/components/ui/card';
import SelectBasic from '@/components/ui-custom/select-basic';
import DateRangePicker from '@/components/ui-custom/date-range-picker';
import { callTypeOptions } from './call-journal-filters.utils';

interface Props {
  dateRange?: DateRange;
  onDateRangeChange: (dateRange?: DateRange) => void;
  callType: string;
  onCallTypeChange: (callType: string) => void;
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
          {/* Период */}
          <DateRangePicker
            open={isRangeOpen}
            onOpenChange={setIsRangeOpen}
            dateRange={dateRange}
            onDateRangeChange={onDateRangeChange}
            label="Период"
            placeholder="Все время"
          />

          {/* Тип звонка */}
          <SelectBasic
            value={callType}
            onValueChange={onCallTypeChange}
            options={callTypeOptions}
            label="Тип звонка"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CallJournalFilters;
