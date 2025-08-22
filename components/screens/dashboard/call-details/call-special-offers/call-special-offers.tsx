import { FC } from 'react';
import { ZapIcon } from 'lucide-react';
import { CallAnalysisResponse } from '@/services/api/calls.api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  analysis: CallAnalysisResponse;
}

const mockSpecialOffers = ['Скидка 15% на ТО', 'Бесплатная диагностика'];

const CallSpecialOffers: FC<Props> = () => {
  return (
    <Card
      className={
        mockSpecialOffers.length
          ? 'border-green-200 bg-green-50 dark:border-green-950 dark:bg-green-950/50'
          : 'border-gray-200 bg-gray-50 dark:border-border dark:bg-card'
      }
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ZapIcon className="size-5" />
          Акции и спецпредложения *
        </CardTitle>
      </CardHeader>

      <CardContent>
        {!mockSpecialOffers.length && (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Акции и спецпредложения в звонке не выявлены
          </div>
        )}

        {!!mockSpecialOffers.length && (
          <div className="space-y-2">
            {mockSpecialOffers.map((offer) => (
              <div
                key={offer}
                className="flex items-start gap-2 rounded border border-green-300 bg-green-100 p-3 dark:border-green-700 dark:bg-green-950/80"
              >
                <ZapIcon className="mt-0.5 size-4 flex-shrink-0 text-green-600 dark:text-green-300" />
                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                  {offer}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CallSpecialOffers;
