import { FC } from 'react';
import { type CallCommentsItem } from '@/services/api/calls-api';

interface Props {
  item: CallCommentsItem;
}

const CallCommentsItem: FC<Props> = ({ item }) => {
  return (
    <div className="border-border/40 py-2 not-last:border-b">
      <p className="text-sm font-medium">Резюме</p>
      <p className="text-sm text-muted-foreground">{item.comment_text}</p>
    </div>
  );
};

export default CallCommentsItem;
