import { FC, useEffect, useState } from 'react';
import { MessageSquare, SquarePlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCallCommentsQuery } from '@/services/api/calls-api';
import { Button } from '@/components/ui/button';
import CallCommentsItem from './call-comments-item';
import CallCommentsEditor from './call-comments-editor';

interface Props {
  callId: string;
}

const CallComments: FC<Props> = ({ callId }) => {
  const [isAddition, setIsAddition] = useState(false);

  const { data, isPending } = useCallCommentsQuery({ callId, pageSize: 100 });

  const isCommentsLength = !!data?.comments.length;

  const toggleIsAddition = () => {
    setIsAddition((state) => !state);
  };

  useEffect(() => {
    if (!isPending && !isCommentsLength) {
      setIsAddition(true);
    }
  }, [isPending, isCommentsLength]);

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
            isPending={false}
            onSuccess={() => null}
            textareaProps={{ className: 'min-h-24' }}
            successBtnText="Добавить заметку"
            onCancel={isCommentsLength ? toggleIsAddition : undefined}
          />
        )}

        {!isAddition && isCommentsLength && (
          <div className="max-h-96 scrollbar-thin overflow-y-auto pr-2">
            {data.comments.map((comment) => (
              <CallCommentsItem key={comment.id} item={comment} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CallComments;
