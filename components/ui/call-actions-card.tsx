import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  User, 
  Phone,
  Calendar,
  Mail,
  MessageSquare,
  TrendingUp,
  Award
} from 'lucide-react';

interface ActionItem {
  id: string;
  text: string;
  type: 'action' | 'opportunity' | 'strength' | 'recommendation';
  priority?: 'high' | 'medium' | 'low';
  assignedTo?: 'manager' | 'client' | 'system';
  dueDate?: string;
  completed?: boolean;
}

interface CallActionsCardProps {
  title: string;
  icon: React.ReactNode;
  items: ActionItem[];
  showActions?: boolean;
  className?: string;
}

const CallActionsCard: React.FC<CallActionsCardProps> = ({ 
  title, 
  icon, 
  items, 
  showActions = false,
  className = '' 
}) => {
  const getItemIcon = (type: ActionItem['type']) => {
    switch (type) {
      case 'action':
        return <Target className="h-4 w-4 text-blue-500" />;
      case 'opportunity':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'strength':
        return <Award className="h-4 w-4 text-green-500" />;
      case 'recommendation':
        return <TrendingUp className="h-4 w-4 text-purple-500" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAssignedIcon = (assignedTo?: string) => {
    switch (assignedTo) {
      case 'manager':
        return <User className="h-3 w-3" />;
      case 'client':
        return <Phone className="h-3 w-3" />;
      case 'system':
        return <Clock className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
              <div className="flex-shrink-0 mt-0.5">
                {getItemIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm leading-relaxed">{item.text}</p>
                  {item.completed && (
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {item.priority && (
                    <Badge className={`text-xs ${getPriorityColor(item.priority)}`}>
                      {item.priority === 'high' ? 'Высокий' : 
                       item.priority === 'medium' ? 'Средний' : 'Низкий'}
                    </Badge>
                  )}
                  {item.assignedTo && (
                    <Badge variant="outline" className="text-xs">
                      {getAssignedIcon(item.assignedTo)}
                      <span className="ml-1">
                        {item.assignedTo === 'manager' ? 'Менеджер' : 
                         item.assignedTo === 'client' ? 'Клиент' : 'Система'}
                      </span>
                    </Badge>
                  )}
                  {item.dueDate && (
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(item.dueDate).toLocaleDateString('ru-RU')}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {showActions && (
          <div className="flex gap-2 mt-4 pt-4 border-t">
            <Button size="sm" variant="outline" className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Отправить
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <Calendar className="h-4 w-4 mr-2" />
              Запланировать
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CallActionsCard; 