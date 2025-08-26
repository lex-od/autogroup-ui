import { FC } from 'react';
import { Copy, Plug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  onCopyToClipboard: (text: string) => void;
}

const IntegrationsGeneral: FC<Props> = ({ onCopyToClipboard }) => {
  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Plug className="h-5 w-5" />
          Webhook настройки
        </CardTitle>
        <CardDescription className="text-blue-700">
          Используйте эти URL для настройки автоматического приема звонков
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div>
          <Label htmlFor="webhook-url">
            Webhook URL для провайдеров телефонии
          </Label>
          <div className="mt-1 flex gap-2">
            <Input
              id="webhook-url"
              readOnly
              value="https://your-domain.com/functions/v1/binotel-webhook"
              className="font-mono text-sm"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                onCopyToClipboard(
                  'https://your-domain.com/functions/v1/binotel-webhook',
                )
              }
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Скопируйте этот URL и добавьте в настройки webhook вашего провайдера
            телефонии
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationsGeneral;
