import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  subtitle?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    className?: string;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const MetricCard = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  subtitle,
  badge,
  className,
  size = 'md'
}: MetricCardProps) => {
  const getChangeColor = (type: string) => {
    switch (type) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  const sizeClasses = {
    sm: {
      card: 'p-4',
      icon: 'h-6 w-6',
      title: 'text-xs',
      value: 'text-lg',
      change: 'text-xs'
    },
    md: {
      card: 'pt-6',
      icon: 'h-8 w-8',
      title: 'text-sm',
      value: 'text-2xl',
      change: 'text-xs'
    },
    lg: {
      card: 'p-8',
      icon: 'h-10 w-10',
      title: 'text-base',
      value: 'text-3xl',
      change: 'text-sm'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardContent className={currentSize.card}>
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className={cn("font-medium text-muted-foreground truncate", currentSize.title)}>
                {title}
              </p>
              {badge && (
                <Badge 
                  variant={badge.variant || 'default'} 
                  className={cn("text-xs", badge.className)}
                >
                  {badge.text}
                </Badge>
              )}
            </div>
            
            <div className="space-y-1">
              <p className={cn("font-bold text-foreground", currentSize.value)}>
                {value}
              </p>
              
              {(change || subtitle) && (
                <div className="flex flex-col gap-1">
                  {change && (
                    <p className={cn(currentSize.change, getChangeColor(changeType))}>
                      {change}
                    </p>
                  )}
                  {subtitle && (
                    <p className={cn("text-muted-foreground", currentSize.change)}>
                      {subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-shrink-0 ml-4">
            <Icon className={cn("text-muted-foreground", currentSize.icon)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard; 