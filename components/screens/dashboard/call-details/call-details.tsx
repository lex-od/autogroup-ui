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
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse">
          <div className="mb-6 h-8 w-48 rounded bg-gray-200"></div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="h-32 rounded bg-gray-200"></div>
              <div className="h-96 rounded bg-gray-200"></div>
            </div>
            <div className="h-96 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
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
          <AudioPlayer
            src={getPublicUrl('call-recordings', call.storage_path)}
            ref={playerRef}
          />
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
