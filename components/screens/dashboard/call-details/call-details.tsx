'use client';

import { useState, useRef } from 'react';
import {
  TranscriptSegmentItem,
  useCallAnalysisQuery,
  useCallDetailsQuery,
  useCallTranscriptQuery,
} from '@/services/api/calls.api';
import { getPublicUrl } from '@/lib/supabase';
import CallTranscript from './call-transcript/call-transcript';
import AiAnalysis from './ai-analysis/ai-analysis';
import AudioPlayer, { AudioPlayerHandle } from './audio-player/audio-player';
import CallComments from './call-comments/call-comments';
import CallDetailsHeader from './call-details-header/call-details-header';
import CallInfo from './call-info/call-info';

interface CallDetailsProps {
  callId: string;
}

const CallDetails = ({ callId }: CallDetailsProps) => {
  const [selectedSegmentStart, setSelectedSegmentStart] = useState<
    number | null
  >(null);

  const playerRef = useRef<AudioPlayerHandle>(null);

  const { data: details, isPending: detailsPending } =
    useCallDetailsQuery(callId);
  const { data: transcript, isPending: transcriptPending } =
    useCallTranscriptQuery(callId);
  const { data: analysis, isPending: analysisPending } =
    useCallAnalysisQuery(callId);

  const handleSegmentClick = (segment: TranscriptSegmentItem) => {
    setSelectedSegmentStart(segment.start_ms);
    playerRef.current?.seek(segment.start_ms / 1000);
    playerRef.current?.play();
  };

  if (detailsPending) {
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
  if (!details) {
    return null;
  }
  return (
    <div className="space-y-6 p-6">
      <CallDetailsHeader call={details} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left side */}
        <div className="space-y-6 lg:col-span-2">
          <CallInfo call={details} />
          <AudioPlayer
            src={getPublicUrl('call-recordings', details.storage_path)}
            ref={playerRef}
          />
          <CallTranscript
            transcript={transcript}
            transcriptPending={transcriptPending}
            selectedSegmentStart={selectedSegmentStart}
            onSegmentClick={handleSegmentClick}
          />
        </div>

        {/* Right side */}
        <div className="space-y-6">
          <AiAnalysis analysis={analysis} analysisPending={analysisPending} />
          <CallComments callId={callId} />
        </div>
      </div>
    </div>
  );
};

export default CallDetails;
