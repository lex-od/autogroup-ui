import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CallStatusBadge from '@/components/ui/call-status-badge';
import CallTypeBadge from '@/components/ui/call-type-badge';

const StatusDemoPage: FC = () => {
  const callStatuses = [
    'uploaded',
    'processing', 
    'transcribing',
    'analyzing',
    'completed',
    'failed'
  ];

  const callTypes: ('incoming' | 'outgoing')[] = ['incoming', 'outgoing'];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Демонстрация статусов звонков</h1>
        <p className="text-muted-foreground">
          Красивые иконки и бейджи для всех статусов звонков
        </p>
      </div>

      {/* Статусы звонков */}
      <Card>
        <CardHeader>
          <CardTitle>Статусы звонков</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {callStatuses.map((status) => (
              <div key={status} className="text-center space-y-2">
                <CallStatusBadge status={status} />
                <p className="text-xs text-muted-foreground capitalize">
                  {status}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Типы звонков */}
      <Card>
        <CardHeader>
          <CardTitle>Типы звонков</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {callTypes.map((type) => (
              <div key={type} className="text-center space-y-2">
                <CallTypeBadge callType={type} />
                <p className="text-xs text-muted-foreground capitalize">
                  {type}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Примеры использования в таблице */}
      <Card>
        <CardHeader>
          <CardTitle>Примеры в контексте</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <CallTypeBadge callType="incoming" />
                <div>
                  <p className="font-medium">Иван Петров</p>
                  <p className="text-sm text-muted-foreground">+380501234567</p>
                </div>
              </div>
              <CallStatusBadge status="completed" />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <CallTypeBadge callType="outgoing" />
                <div>
                  <p className="font-medium">Мария Сидорова</p>
                  <p className="text-sm text-muted-foreground">+380671234567</p>
                </div>
              </div>
              <CallStatusBadge status="processing" />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <CallTypeBadge callType="incoming" />
                <div>
                  <p className="font-medium">Алексей Козлов</p>
                  <p className="text-sm text-muted-foreground">+380631234567</p>
                </div>
              </div>
              <CallStatusBadge status="analyzing" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusDemoPage; 