import { FC } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const CallSearchInput: FC<Props> = ({ value, onChange }) => {
  return (
    <div className="relative grow basis-60">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        placeholder="Поиск по номеру телефона, имени клиента или менеджеру..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};

export default CallSearchInput;
