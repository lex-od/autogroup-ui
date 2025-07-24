import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock,
  Target,
  Users,
  MessageSquare,
  Handshake,
  Award,
  TrendingUp
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  score: number;
  maxScore: number;
  category: string;
  icon?: React.ReactNode;
}

interface ServiceChecklistCardProps {
  items: ChecklistItem[];
  className?: string;
}

const ServiceChecklistCard: React.FC<ServiceChecklistCardProps> = ({ 
  items, 
  className = '' 
}) => {
  const getItemIcon = (category: string) => {
    switch (category) {
      case 'greeting':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'needs_identification':
        return <Target className="h-4 w-4 text-green-500" />;
      case 'product_presentation':
        return <TrendingUp className="h-4 w-4 text-purple-500" />;
      case 'objection_handling':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'closing':
        return <Handshake className="h-4 w-4 text-red-500" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (completed: boolean, score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    
    if (completed && percentage >= 80) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (completed && percentage >= 60) {
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    } else if (completed) {
      return <XCircle className="h-4 w-4 text-red-500" />;
    } else {
      return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 80) {
      return 'bg-green-100 text-green-800 border-green-200';
    } else if (percentage >= 60) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    } else {
      return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const totalScore = items.reduce((sum, item) => sum + item.score, 0);
  const maxTotalScore = items.reduce((sum, item) => sum + item.maxScore, 0);
  const overallPercentage = maxTotalScore > 0 ? (totalScore / maxTotalScore) * 100 : 0;

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'greeting':
        return 'Приветствие';
      case 'needs_identification':
        return 'Выявление потребностей';
      case 'product_presentation':
        return 'Презентация продукта';
      case 'objection_handling':
        return 'Работа с возражениями';
      case 'closing':
        return 'Завершение';
      default:
        return category;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Чек-лист сервиса
          <Badge variant="secondary" className="ml-auto">
            {totalScore}/{maxTotalScore} баллов
          </Badge>
        </CardTitle>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Общий результат</span>
            <span className="font-medium">{overallPercentage.toFixed(0)}%</span>
          </div>
          <Progress value={overallPercentage} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getItemIcon(item.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-medium">{getCategoryName(item.category)}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.completed, item.score, item.maxScore)}
                      <Badge className={`text-xs ${getScoreColor(item.score, item.maxScore)}`}>
                        {item.score}/{item.maxScore}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={(item.score / item.maxScore) * 100} 
                      className="h-1.5" 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceChecklistCard; 