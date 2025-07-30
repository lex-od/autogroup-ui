import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  initText?: string;
  textareaProps?: React.ComponentProps<typeof Textarea>;
  onSuccess: (text: string) => void;
  onCancel?: () => void;
}

const CallCommentsEditor: FC<Props> = ({
  initText,
  textareaProps,
  onSuccess,
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
          disabled={!text}
          onClick={() => onSuccess(text)}
        >
          Сохранить
        </Button>
        <Button variant="outline" size="sm" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </div>
  );
};

export default CallCommentsEditor;
