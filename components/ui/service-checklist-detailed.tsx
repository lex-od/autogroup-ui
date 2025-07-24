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
  TrendingUp,
  Phone,
  User,
  Car,
  Wrench,
  MapPin,
  Calendar,
  FileText,
  Star,
  Info,
  Building
} from 'lucide-react';

interface ChecklistItem {
  id: number;
  name: string;
  description: string;
  category: 'obligatory' | 'contextual';
  completed: boolean;
  score: number;
  maxScore: number;
  explanation?: string;
  icon?: React.ReactNode;
}

interface ServiceChecklistDetailedProps {
  items: ChecklistItem[];
  isServiceCall: boolean;
  className?: string;
}

const ServiceChecklistDetailed: React.FC<ServiceChecklistDetailedProps> = ({ 
  items, 
  isServiceCall,
  className = '' 
}) => {
  const getItemIcon = (id: number) => {
    const iconMap: { [key: number]: React.ReactNode } = {
      1: <Phone className="h-4 w-4 text-blue-500" />,
      2: <Building className="h-4 w-4 text-green-500" />,
      3: <Users className="h-4 w-4 text-purple-500" />,
      4: <User className="h-4 w-4 text-orange-500" />,
      5: <MessageSquare className="h-4 w-4 text-indigo-500" />,
      6: <User className="h-4 w-4 text-teal-500" />,
      7: <User className="h-4 w-4 text-pink-500" />,
      8: <Car className="h-4 w-4 text-red-500" />,
      9: <TrendingUp className="h-4 w-4 text-yellow-500" />,
      10: <Wrench className="h-4 w-4 text-gray-500" />,
      11: <Info className="h-4 w-4 text-blue-600" />,
      12: <Calendar className="h-4 w-4 text-green-600" />,
      13: <MessageSquare className="h-4 w-4 text-purple-600" />,
      14: <Clock className="h-4 w-4 text-orange-600" />,
      15: <MapPin className="h-4 w-4 text-indigo-600" />,
      16: <Calendar className="h-4 w-4 text-teal-600" />,
      17: <Phone className="h-4 w-4 text-pink-600" />,
      18: <FileText className="h-4 w-4 text-red-600" />,
      19: <Star className="h-4 w-4 text-yellow-600" />,
      20: <Award className="h-4 w-4 text-gray-600" />
    };
    return iconMap[id] || <CheckCircle className="h-4 w-4" />;
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

  const getCategoryColor = (category: string) => {
    return category === 'obligatory' 
      ? 'bg-red-50 border-red-200' 
      : 'bg-blue-50 border-blue-200';
  };

  const totalScore = items.reduce((sum, item) => sum + item.score, 0);
  const maxTotalScore = items.reduce((sum, item) => sum + item.maxScore, 0);
  const overallPercentage = maxTotalScore > 0 ? (totalScore / maxTotalScore) * 100 : 0;

  if (!isServiceCall) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Чек-лист по скрипту сервиса
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
            <div key={item.id} className={`p-3 rounded-lg border ${getCategoryColor(item.category)}`}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getItemIcon(item.id)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">
                        {item.id}. {item.name}
                      </h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          item.category === 'obligatory' 
                            ? 'border-red-300 text-red-700 bg-red-50' 
                            : 'border-blue-300 text-blue-700 bg-blue-50'
                        }`}
                      >
                        {item.category === 'obligatory' ? 'Обязательный' : 'Контекстный'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.completed, item.score, item.maxScore)}
                      <Badge className={`text-xs ${getScoreColor(item.score, item.maxScore)}`}>
                        {item.score}/{item.maxScore}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {item.explanation && (
                    <div className="bg-white p-2 rounded border-l-4 border-blue-400">
                      <p className="text-xs text-blue-700">
                        <strong>Объяснение:</strong> {item.explanation}
                      </p>
                    </div>
                  )}
                  
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

export default ServiceChecklistDetailed; 