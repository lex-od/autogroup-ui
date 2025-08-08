import { FC } from 'react';
import { Settings, RefreshCw, Brain, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const CallDetailsActionsMenu: FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={false}>
          {false ? <LoaderCircle className="animate-spin" /> : <Settings />}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => null}>
          <RefreshCw />
          <span>Повторная транскрибация</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => null}>
          <Brain />
          <span>Обработка ролей</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => null}>
          <Brain />
          <span>Повторный AI-анализ</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CallDetailsActionsMenu;
