import { FC } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { CallDetailsResponse } from '@/services/api/calls.api';
import { Button } from '@/components/ui/button';
import { getPublicUrl } from '@/lib/supabase';
import CallStatusBadge from '@/components/ui-custom/call-status-badge';
import CallDetailsActionsMenu from './call-details-actions-menu';

interface Props {
  call: CallDetailsResponse;
}

const CallDetailsHeader: FC<Props> = ({ call }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      {/* Left side */}
      <div className="flex flex-wrap items-center gap-x-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/calls" className="cursor-default">
            <ArrowLeft />
            <span>Назад к звонкам</span>
          </Link>
        </Button>

        <div>
          <h1 className="text-2xl font-bold">
            Звонок {call.client_name || call.phone_number}
          </h1>
          <p className="text-muted-foreground">
            {new Date(call.created_at).toLocaleString('ru-RU')}
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-x-2">
        <CallStatusBadge status={call.status} className="px-3 py-1.5" />

        <CallDetailsActionsMenu />

        {call.storage_path && (
          <Button variant="outline" className="cursor-default" asChild>
            <a
              href={getPublicUrl('call-recordings', call.storage_path, {
                download: true,
              })}
            >
              <Download />
              <span>Скачать запись</span>
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

export default CallDetailsHeader;
