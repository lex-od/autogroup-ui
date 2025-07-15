import { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface SelectBasicOption {
  value: string;
  label: string;
}
export type SelectBasicProps = {
  options: SelectBasicOption[];
  placeholder?: string;
  triggerProps?: React.ComponentProps<typeof SelectTrigger>;
} & React.ComponentProps<typeof Select>;

const SelectBasic: FC<SelectBasicProps> = ({
  options,
  placeholder,
  triggerProps,
  ...selectProps
}) => {
  return (
    <Select {...selectProps}>
      <SelectTrigger {...triggerProps}>
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
  );
};

export default SelectBasic;
