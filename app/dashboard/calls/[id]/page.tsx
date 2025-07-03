import { FC } from 'react';
import CallDetails from '@/components/screens/dashboard/call-details/call-details';

interface CallDetailsPageProps {
  params: Promise<{ id: string }>;
}

const CallDetailsPage: FC<CallDetailsPageProps> = async ({ params }) => {
  const { id } = await params;

  return <CallDetails callId={id} />;
};

export default CallDetailsPage;
