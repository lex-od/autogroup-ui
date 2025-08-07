import { Skeleton } from '@/components/ui/skeleton';

const CallTableSkeleton = () => {
  return [...Array(11)].map((_, i) => (
    <div key={i} className="px-2 py-4">
      <Skeleton className="h-5" />
    </div>
  ));
};

export default CallTableSkeleton;
