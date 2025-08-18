import { FC, useEffect, useState } from 'react';
import { MessageSquare, SquarePlus } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CallCommentsResponse,
  useAddCallCommentMutation,
} from '@/services/api/calls.api';
import { Button } from '@/components/ui/button';
import CallCommentsItem from './call-comments-item';
import CallCommentsEditor from './call-comments-editor';

interface Props {
  comments?: CallCommentsResponse;
  callId: string;
}

const CallComments: FC<Props> = ({ comments, callId }) => {
  const queryClient = useQueryClient();

  const [isAddition, setIsAddition] = useState(false);

  const { mutate: addComment, isPending: addCommentPending } =
    useAddCallCommentMutation({
      onSuccess: () => {
        setIsAddition(false);
        queryClient.invalidateQueries({ queryKey: ['call-comments'] });
      },
    });

  const isCommentsLength = !!comments?.comments.length;

  const toggleIsAddition = () => {
    setIsAddition((state) => !state);
  };

  useEffect(() => {
    if (!isCommentsLength) {
      setIsAddition(true);
    }
  }, [isCommentsLength]);

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <h2 className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 shrink-0" />
            Заметки
          </h2>

          {!isAddition && (
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              title="Добавить заметку"
              onClick={toggleIsAddition}
            >
              <SquarePlus className="size-5" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {isAddition && (
          <CallCommentsEditor
            isPending={addCommentPending}
            onSuccess={(text) => addComment({ callId, text })}
            textareaProps={{ className: 'min-h-24' }}
            successBtnText="Добавить заметку"
            onCancel={isCommentsLength ? toggleIsAddition : undefined}
          />
        )}

        {!isAddition && isCommentsLength && (
          <div className="scrollbar-thin max-h-96 overflow-y-auto pr-2">
            {comments.comments.map((comment) => (
              <CallCommentsItem key={comment.id} item={comment} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CallComments;
