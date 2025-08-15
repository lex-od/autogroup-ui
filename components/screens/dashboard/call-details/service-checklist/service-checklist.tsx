import { FC } from 'react';
import { Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import ServiceChecklistItem, {
  FakeChecklistItem,
} from './service-checklist-item/service-checklist-item';

const fakeServiceChecklist: FakeChecklistItem[] = [
  {
    id: '1',
    name: 'Реакция на звонок (количество гудков)',
    description:
      'Оцени, если транскрипция предоставляет метаданные о времени до ответа или явные указания на гудки. Балл: 1, если ответ в течение 20 секунд.',
    category: 'obligatory',
    score: 1,
    maxScore: 1,
    explanation: 'Ответ получен в течение 15 секунд',
  },
];

const ServiceChecklist: FC = () => {
  return (
    <Card id="service-checklist">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="size-5 shrink-0" />
          <h2>Чек-лист по скрипту сервиса</h2>
          <Badge variant="secondary" className="ml-auto">
            1/1 баллов
          </Badge>
        </CardTitle>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <p>Общий результат</p>
            <p className="font-medium">100%</p>
          </div>
          <Progress value={100} className="h-2" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {fakeServiceChecklist.map((item) => (
            <ServiceChecklistItem key={item.id} item={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceChecklist;
