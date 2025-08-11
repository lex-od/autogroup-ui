import { FC } from 'react';
import { Clock, Phone, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CallDetailsResponse } from '@/services/api/calls.api';
import { formatDuration } from '../call-details.utils';

interface Props {
  call: CallDetailsResponse;
}

const CallInfo: FC<Props> = ({ call }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Номер телефона</p>
              <p className="font-medium">{call.phone_number || 'Нет номера'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Клиент</p>
              <p className="font-medium">
                {call.client_name || 'Нет названия'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Менеджер</p>
              <p className="font-medium">{call.manager_name || 'Нет имени'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Длительность</p>
              <p className="font-medium">
                {call.duration_seconds
                  ? formatDuration(call.duration_seconds)
                  : 'Нет данных'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallInfo;
