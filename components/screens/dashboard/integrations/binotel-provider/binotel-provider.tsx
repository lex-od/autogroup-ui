import { FC } from 'react';
import { CheckCircle, Copy, ExternalLink, Phone, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  onCopyToClipboard: (text: string) => void;
}

const mockBinotelIntegration = {
  status: 'connected',
  webhookUrl: 'https://your-domain.com/functions/v1/binotel-webhook',
  lastSync: '25.01.2025, 11:30',
};

const BinotelProvider: FC<Props> = ({ onCopyToClipboard }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge variant="tw-green">✅ Подключено</Badge>;
      case 'disconnected':
        return <Badge variant="destructive">❌ Отключено</Badge>;
      case 'available':
        return <Badge variant="outline">📋 Доступно</Badge>;
      default:
        return <Badge variant="secondary">❓ Неизвестно</Badge>;
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <Phone className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold">Binotel</h3>
              <p className="text-sm text-muted-foreground">
                Автоматический прием звонков через webhook
              </p>
              {mockBinotelIntegration.lastSync && (
                <p className="text-xs text-muted-foreground">
                  Последняя синхронизация: {mockBinotelIntegration.lastSync}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {getStatusBadge(mockBinotelIntegration.status)}
            <Button size="sm" variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Настроить
            </Button>
          </div>
        </div>

        {mockBinotelIntegration.status === 'connected' && (
          <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Интеграция активна
                </span>
              </div>

              <div className="space-y-2">
                <Label className="text-green-800">Webhook URL</Label>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value={mockBinotelIntegration.webhookUrl}
                    className="bg-white font-mono text-sm"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      onCopyToClipboard(mockBinotelIntegration.webhookUrl)
                    }
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 w-12 border-green-300 bg-green-100"
                  >
                    ✓
                  </Button>
                  <Label className="text-green-800">
                    Автоматический прием звонков
                  </Label>
                </div>
                <Button size="sm" variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Тест подключения
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BinotelProvider;
