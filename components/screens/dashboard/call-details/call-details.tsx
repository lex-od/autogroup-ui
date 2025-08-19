'use client';

import { useCallback, useRef } from 'react';
import {
  TranscriptSegmentItem,
  useCallAnalysisQuery,
  useCallCommentsQuery,
  useCallDetailsQuery,
  useCallTranscriptQuery,
} from '@/services/api/calls.api';
import { getPublicUrl } from '@/lib/supabase';
import TranscriptChat from './transcript-chat/transcript-chat';
import AiAnalysis from './ai-analysis/ai-analysis';
import AiAnalysisActions from './ai-analysis-actions/ai-analysis-actions';
import AudioPlayer, { AudioPlayerHandle } from './audio-player/audio-player';
import CallComments from './call-comments/call-comments';
import CallDetailsHeader from './call-details-header/call-details-header';
import CallInfo from './call-info/call-info';
import CallSummary from './call-summary/call-summary';
import ServiceChecklist from './service-checklist/service-checklist';
import CallDetailsSkeleton from './call-details-skeleton';

interface CallDetailsProps {
  callId: string;
}

const CallDetails = ({ callId }: CallDetailsProps) => {
  const playerRef = useRef<AudioPlayerHandle>(null);

  const { data: call, isPending: callPending } = useCallDetailsQuery(callId);
  const { data: transcript, isLoading: transcriptLoading } =
    useCallTranscriptQuery(callId, {
      enabled: call?.status === 'completed',
    });
  const { data: analysis, isLoading: analysisLoading } = useCallAnalysisQuery(
    callId,
    { enabled: call?.status === 'completed' },
  );
  const { data: comments, isLoading: commentsLoading } = useCallCommentsQuery(
    { callId, pageSize: 100 },
    { enabled: !!call },
  );

  const isServiceCall = analysis?.topics.some((topic) => {
    return ['сервис', 'обслуживание', 'ТО'].includes(topic);
  });

  const handleSegmentPlayClick = useCallback(
    (segment: TranscriptSegmentItem) => {
      playerRef.current?.seek(segment.start_ms / 1000);
      playerRef.current?.play();
    },
    [],
  );

  if (callPending || transcriptLoading || analysisLoading || commentsLoading) {
    return <CallDetailsSkeleton />;
  }
  if (!call) {
    return null;
  }
  return (
    <div className="space-y-6 p-6">
      <CallDetailsHeader call={call} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left side */}
        <div className="space-y-6 lg:col-span-2">
          <CallInfo
            call={call}
            analysis={analysis}
            isServiceCall={isServiceCall}
          />
          {call.storage_path && (
            <AudioPlayer
              src={getPublicUrl('audio-files', call.storage_path)}
              ref={playerRef}
            />
          )}
          {analysis && <CallSummary analysis={analysis} call={call} />}

          {transcript && (
            <TranscriptChat
              transcript={transcript}
              onSegmentPlayClick={handleSegmentPlayClick}
            />
          )}
          {isServiceCall && <ServiceChecklist />}
        </div>

        {/* Right side */}
        <div className="space-y-6">
          {analysis && <AiAnalysis analysis={analysis} />}

          {analysis && <AiAnalysisActions actions={analysis.action_items} />}

          <CallComments comments={comments} callId={callId} />
        </div>
      </div>
    </div>
  );
};

export default CallDetails;
