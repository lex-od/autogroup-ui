import { FC, useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { SquarePen, Trash, User } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useDeleteCallCommentMutation,
  useUpdateCallCommentMutation,
  type CallCommentsItem,
} from '@/services/api/calls-api';
import { Button } from '@/components/ui/button';
import { useCurrentUserQuery } from '@/services/api/auth-api';
import CallCommentsEditor from './call-comments-editor';

interface Props {
  item: CallCommentsItem;
}

const CallCommentsItem: FC<Props> = ({ item }) => {
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);

  const { data: currentUser } = useCurrentUserQuery();

  const { mutate: updateComment, isPending: updateCommentPending } =
    useUpdateCallCommentMutation({
      onSuccess: () => {
        setIsEditing(false);
        queryClient.invalidateQueries({ queryKey: ['call-comments'] });
      },
    });
  const { mutate: deleteComment, isPending: deleteCommentPending } =
    useDeleteCallCommentMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['call-comments'] });
      },
    });

  const isOwner = item.user_id === currentUser?.user?.id;

  const createdAtDate = useMemo(
    () => format(parseISO(item.created_at), 'dd.MM.yyyy'),
    [item.created_at],
  );

  return (
    <div className="border-border/40 py-3 pl-1 not-last:border-b">
      {isEditing && (
        <CallCommentsEditor
          isPending={updateCommentPending}
          onSuccess={(text) => updateComment({ commentId: item.id, text })}
          initText={item.comment_text}
          onCancel={() => setIsEditing(false)}
        />
      )}

      {!isEditing && (
        <div className="space-y-1">
          {/* Header */}
          <div className="flex items-center gap-1">
            <User size={16} className="shrink-0 text-muted-foreground" />
            <p className="truncate text-sm font-medium">[user-name]</p>

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
                onClick={() => setIsEditing(true)}
                disabled={deleteCommentPending}
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
                onClick={() => deleteComment(item.id)}
                disabled={deleteCommentPending}
              >
                <Trash className="size-3.5" />
              </Button>
            )}
          </div>

          {/* Text */}
          <p className="text-sm break-words whitespace-pre-wrap text-foreground/80">
            {item.comment_text}
          </p>
        </div>
      )}
    </div>
  );
};

export default CallCommentsItem;
