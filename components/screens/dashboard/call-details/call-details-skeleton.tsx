import { FC } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CallDetailsSkeleton: FC = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <Skeleton className="h-14 w-116" />
        <Skeleton className="h-9 w-75" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left side */}
        <div className="space-y-6 lg:col-span-2">
          <Skeleton className="h-84" />
          <Skeleton className="h-62" />
          <Skeleton className="h-70" />
        </div>

        {/* Right side */}
        <div className="space-y-6">
          <Skeleton className="h-80" />
          <Skeleton className="h-60" />
          <Skeleton className="h-57" />
        </div>
      </div>
    </div>
  );
};

export default CallDetailsSkeleton;
