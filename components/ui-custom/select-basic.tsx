import { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface SelectBasicOption {
  value: string;
  label: string;
}
export type SelectBasicProps = {
  value?: string;
  onValueChange: (value: string) => void;
  options: SelectBasicOption[];
  label?: string;
  placeholder?: string;
  className?: string;
  triggerProps?: React.ComponentProps<typeof SelectTrigger>;
};

const SelectBasic: FC<SelectBasicProps> = ({
  value,
  onValueChange,
  options,
  label,
  placeholder,
  className,
  triggerProps,
}) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && <Label className="px-1">{label}</Label>}

      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full bg-background" {...triggerProps}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectBasic;
