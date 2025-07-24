'use client';

import { Suspense } from 'react';
import { CallDetailsFinalV2 } from '@/components/screens/dashboard/call-details/call-details-final-v2';
import { ProcessingControls } from '@/components/ui/processing-controls';

interface CallDetailsPageProps {
  params: {
    id: string;
  };
}

export default function CallDetailsPage({ params }: CallDetailsPageProps) {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Управление обработкой вверху */}
      <ProcessingControls
        callId={params.id}
        currentStatus="completed"
        onRetranscribe={() => console.log('Retranscribe clicked')}
        onPostProcessRoles={() => console.log('Post process roles clicked')}
        onReanalyze={() => console.log('Reanalyze clicked')}
      />
      
      {/* Основной контент */}
      <Suspense fallback={<div>Загрузка...</div>}>
        <CallDetailsFinalV2 callId={params.id} />
      </Suspense>
    </div>
  );
} 