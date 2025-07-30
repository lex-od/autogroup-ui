import { FC, useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { SquarePen, Trash, User } from 'lucide-react';
import { type CallCommentsItem } from '@/services/api/calls-api';
import { Button } from '@/components/ui/button';
import { useCurrentUserQuery } from '@/services/api/auth-api';
import CallCommentsEditor from './call-comments-editor';

interface Props {
  item: CallCommentsItem;
}

const CallCommentsItem: FC<Props> = ({ item }) => {
  const [isEdit, setIsEdit] = useState(false);

  const { data: currentUser } = useCurrentUserQuery();

  const isOwner = item.user_id === currentUser?.user?.id;

  const createdAtDate = useMemo(
    () => format(parseISO(item.created_at), 'dd.MM.yyyy'),
    [item.created_at],
  );

  return (
    <div className="border-border/40 py-3 pl-1 not-last:border-b">
      {isEdit && (
        <CallCommentsEditor
          isPending={false}
          onSuccess={() => null}
          initText={item.comment_text}
          onCancel={() => setIsEdit(false)}
        />
      )}

      {!isEdit && (
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            {/* User name */}
            <User size={16} className="shrink-0 text-muted-foreground" />
            <p className="truncate text-sm font-medium">[user-name]</p>

            {/* Date */}
            <p className="ml-auto shrink-0 text-xs text-muted-foreground">
              {createdAtDate}
            </p>

            {/* Actions */}
            {isOwner && (
              <Button
                variant="ghost"
                size="icon"
                className="size-5"
                title="Редактировать"
                onClick={() => setIsEdit(true)}
              >
                <SquarePen className="size-3.5" />
              </Button>
            )}
            {isOwner && (
              <Button
                variant="ghost"
                size="icon"
                className="size-5"
                title="Удалить"
              >
                <Trash className="size-3.5" />
              </Button>
            )}
          </div>

          <p className="text-sm text-foreground/80">{item.comment_text}</p>
        </div>
      )}
    </div>
  );
};

export default CallCommentsItem;
