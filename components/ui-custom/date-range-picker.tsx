import { FC } from 'react';
import { DateRange } from 'react-day-picker';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export interface DateRangePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dateRange?: DateRange;
  onDateRangeChange: (dateRange?: DateRange) => void;
  label?: string;
}

const DateRangePicker: FC<DateRangePickerProps> = ({
  open,
  onOpenChange,
  dateRange,
  onDateRangeChange,
  label,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label className="px-1">{label}</Label>}

      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-48 justify-between font-normal"
          >
            {/* {date ? date.toLocaleDateString() : 'Select date'} */}
            Select date
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={onDateRangeChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
