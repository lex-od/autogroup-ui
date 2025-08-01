'use client';

import {
  Upload,
  FileText,
  Calendar,
  Users,
  BarChart3,
  Brain,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuickActionsProps {
  onActionClick?: (action: string) => void;
}

const QuickActions = ({ onActionClick }: QuickActionsProps) => {
  const actions = [
    {
      id: 'schedule-call',
      title: 'Запланировать звонок',
      description: 'Добавить новый звонок в расписание',
      icon: Calendar,
      color: 'bg-blue-500/10 text-blue-600',
      hoverColor: 'group-hover:bg-blue-500/20',
    },
    {
      id: 'import-contacts',
      title: 'Импорт контактов',
      description: 'Загрузить новые контакты из файла',
      icon: Upload,
      color: 'bg-green-500/10 text-green-600',
      hoverColor: 'group-hover:bg-green-500/20',
    },
    {
      id: 'ai-settings',
      title: 'Настройки AI',
      description: 'Конфигурация алгоритмов анализа',
      icon: Brain,
      color: 'bg-purple-500/10 text-purple-600',
      hoverColor: 'group-hover:bg-purple-500/20',
    },
    {
      id: 'create-report',
      title: 'Создать отчет',
      description: 'Сгенерировать детальный отчет',
      icon: FileText,
      color: 'bg-orange-500/10 text-orange-600',
      hoverColor: 'group-hover:bg-orange-500/20',
    },
    {
      id: 'manage-users',
      title: 'Управление пользователями',
      description: 'Добавить или редактировать менеджеров',
      icon: Users,
      color: 'bg-pink-500/10 text-pink-600',
      hoverColor: 'group-hover:bg-pink-500/20',
    },
    {
      id: 'analytics',
      title: 'Аналитика',
      description: 'Подробные графики и метрики',
      icon: BarChart3,
      color: 'bg-indigo-500/10 text-indigo-600',
      hoverColor: 'group-hover:bg-indigo-500/20',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-primary"></div>
          <span>Быстрые действия</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {actions.map((action) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={action.id}
                variant="ghost"
                className="group h-auto justify-start p-4 hover:bg-muted/50"
                onClick={() => onActionClick?.(action.id)}
              >
                <div className="flex w-full items-center space-x-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${action.color} ${action.hoverColor}`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <div className="text-sm font-medium">{action.title}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
