import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, TrendingUp, Clock, Users, Target, Activity } from 'lucide-react';

interface CallMetricsCardProps {
  title: string;
  icon: React.ReactNode;
  metrics: {
    label: string;
    value: string | number;
    unit?: string;
    progress?: number;
    color?: string;
    stars?: number;
  }[];
  className?: string;
}

const CallMetricsCard: React.FC<CallMetricsCardProps> = ({ 
  title, 
  icon, 
  metrics, 
  className = '' 
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </span>
                <div className="flex items-center gap-2">
                  {metric.stars ? (
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3 w-3 ${
                            star <= metric.stars!
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm font-semibold">
                      {metric.value}
                      {metric.unit && <span className="text-muted-foreground ml-1">{metric.unit}</span>}
                    </span>
                  )}
                </div>
              </div>
              {metric.progress !== undefined && (
                <Progress value={metric.progress} className="h-2" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CallMetricsCard; 