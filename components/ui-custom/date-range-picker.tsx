import { FC } from 'react';
import { DateRange } from 'react-day-picker';
import { ru } from 'react-day-picker/locale';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface DateRangePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dateRange?: DateRange;
  onDateRangeChange: (dateRange?: DateRange) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

const DateRangePicker: FC<DateRangePickerProps> = ({
  open,
  onOpenChange,
  dateRange,
  onDateRangeChange,
  label,
  placeholder = 'Выберите период',
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && <Label className="px-1">{label}</Label>}

      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between font-normal hover:bg-background"
          >
            {dateRange?.from && dateRange?.to
              ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
              : placeholder}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={onDateRangeChange}
            numberOfMonths={2}
            locale={ru}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
