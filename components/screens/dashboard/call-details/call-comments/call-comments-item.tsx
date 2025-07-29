import { FC, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { User } from 'lucide-react';
import { type CallCommentsItem } from '@/services/api/calls-api';

interface Props {
  item: CallCommentsItem;
}

const CallCommentsItem: FC<Props> = ({ item }) => {
  const createdAtDate = useMemo(
    () => format(parseISO(item.created_at), 'dd.MM.yyyy'),
    [item.created_at],
  );

  return (
    <div className="space-y-1 border-border/40 py-3 not-last:border-b">
      <div className="flex items-center gap-1">
        <User size={16} className="shrink-0 text-muted-foreground" />
        <p className="truncate text-sm font-medium">[user-name]</p>
        <p className="ml-auto shrink-0 text-xs text-muted-foreground">
          {createdAtDate}
        </p>
      </div>

      <p className="text-sm text-foreground/80">{item.comment_text}</p>
    </div>
  );
};

export default CallCommentsItem;
