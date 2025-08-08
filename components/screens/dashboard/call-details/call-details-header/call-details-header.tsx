import { FC } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { CallDetailsResponse } from '@/services/api/calls.api';
import { Button } from '@/components/ui/button';
import { getPublicUrl } from '@/lib/supabase';

interface Props {
  details: CallDetailsResponse;
}

const CallDetailsHeader: FC<Props> = ({ details }) => {
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
            Звонок {details.client_name || details.phone_number}
          </h1>
          <p className="text-muted-foreground">
            {new Date(details.created_at).toLocaleString('ru-RU')}
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-x-2">
        <Button variant="outline" className="cursor-default" asChild>
          <a
            href={getPublicUrl('call-recordings', details.storage_path, {
              download: true,
            })}
          >
            <Download />
            Скачать запись
          </a>
        </Button>
      </div>
    </div>
  );
};

export default CallDetailsHeader;
