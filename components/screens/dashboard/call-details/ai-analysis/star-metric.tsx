import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { FC } from 'react';

interface StarMetricProps {
  starCount: number | null;
}

const StarMetric: FC<StarMetricProps> = ({ starCount }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            'size-3',
            (starCount ?? 0) >= i + 1
              ? 'fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500'
              : 'text-gray-300 dark:text-gray-600',
          )}
        />
      ))}
    </div>
  );
};

export default StarMetric;
