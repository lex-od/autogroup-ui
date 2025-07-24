import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, User, Target } from 'lucide-react';

interface CallSummaryCardProps {
  summary: string;
  callPurpose?: string;
  callOutcome?: string;
  participants?: {
    manager?: string;
    client?: string;
  };
  className?: string;
}

const CallSummaryCard: React.FC<CallSummaryCardProps> = ({ 
  summary, 
  callPurpose, 
  callOutcome,
  participants,
  className = '' 
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Резюме звонка
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Основное резюме */}
        <div className="space-y-2">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {summary || 'Резюме звонка не доступно'}
          </p>
        </div>

        {/* Дополнительная информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          {callPurpose && (
            <div className="flex items-start gap-2">
              <Target className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <span className="text-xs font-medium text-muted-foreground">Цель звонка</span>
                <p className="text-sm">{callPurpose}</p>
              </div>
            </div>
          )}
          
          {callOutcome && (
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <span className="text-xs font-medium text-muted-foreground">Результат</span>
                <p className="text-sm">{callOutcome}</p>
              </div>
            </div>
          )}
        </div>

        {/* Участники */}
        {participants && (
          <div className="pt-4 border-t">
            <div className="flex items-start gap-2">
              <User className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="space-y-1">
                <span className="text-xs font-medium text-muted-foreground">Участники</span>
                <div className="flex flex-wrap gap-2">
                  {participants.manager && (
                    <Badge variant="outline" className="text-xs">
                      Менеджер: {participants.manager}
                    </Badge>
                  )}
                  {participants.client && (
                    <Badge variant="outline" className="text-xs">
                      Клиент: {participants.client}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CallSummaryCard; 