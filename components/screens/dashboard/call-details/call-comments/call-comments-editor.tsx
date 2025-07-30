import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle } from 'lucide-react';

interface Props {
  isPending: boolean;
  onSuccess: (text: string) => void;
  initText?: string;
  textareaProps?: React.ComponentProps<typeof Textarea>;
  successBtnText?: string;
  onCancel?: () => void;
}

const CallCommentsEditor: FC<Props> = ({
  isPending,
  onSuccess,
  initText,
  textareaProps,
  successBtnText,
  onCancel,
}) => {
  const [text, setText] = useState(initText || '');

  return (
    <div className="space-y-3">
      <Textarea
        placeholder="Введите текст заметки"
        value={text}
        onChange={(e) => setText(e.target.value)}
        {...textareaProps}
      />

      <div className="flex gap-2">
        <Button
          size="sm"
          className="grow"
          disabled={!text || isPending}
          onClick={() => onSuccess(text)}
        >
          {isPending && <LoaderCircle className="animate-spin" />}
          {isPending ? 'Подождите' : successBtnText || 'Сохранить'}
        </Button>

        {onCancel && (
          <Button variant="outline" size="sm" onClick={onCancel}>
            Отмена
          </Button>
        )}
      </div>
    </div>
  );
};

export default CallCommentsEditor;
