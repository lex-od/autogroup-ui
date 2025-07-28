import { FC, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCallCommentsQuery } from '@/services/api/calls-api';
import CallCommentsItem from './call-comments-item';

interface Props {
  callId: string;
}

const CallComments: FC<Props> = ({ callId }) => {
  const [commentingType] = useState<'add' | 'edit' | null>(null);

  const { data, isPending } = useCallCommentsQuery({ callId, pageSize: 100 });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5" />
          <span>Заметки</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {commentingType && (
          <div>
            <textarea
              className="h-32 w-full resize-none rounded-md border p-3 text-sm"
              placeholder="Добавьте заметки к этому звонку..."
            />
            <Button className="mt-3 w-full" size="sm">
              Сохранить заметки
            </Button>
          </div>
        )}

        {!commentingType && !isPending && data && (
          <div className="">
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
