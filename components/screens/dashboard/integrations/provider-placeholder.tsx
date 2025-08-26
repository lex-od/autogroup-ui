import { FC } from 'react';
import { Phone, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  name: string;
  description: string;
}

const ProviderPlaceholder: FC<Props> = ({ name, description }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <Phone className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold">{name}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline">📋 Доступно</Badge>
            <Button size="sm" variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Настроить
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderPlaceholder;
