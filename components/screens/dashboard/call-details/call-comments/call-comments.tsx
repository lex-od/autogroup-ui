import { FC, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCallCommentsQuery } from '@/services/api/calls-api';
import CallCommentsItem from './call-comments-item';
import CallCommentsEditor from './call-comments-editor';

interface Props {
  callId: string;
}

const CallComments: FC<Props> = ({ callId }) => {
  const [commentingType] = useState<'add' | 'edit' | null>('add');

  const { data, isPending } = useCallCommentsQuery({ callId, pageSize: 100 });

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5" />
          <span>Заметки</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {commentingType && (
          <CallCommentsEditor
            textareaProps={{ className: 'min-h-24' }}
            onSuccess={() => null}
          />
        )}

        {!commentingType && !isPending && data && (
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
