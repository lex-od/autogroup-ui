import CallDetailScreen from '@/components/screens/dashboard/call-detail/call-detail';

interface CallDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CallDetailPage({ params }: CallDetailPageProps) {
  const { id } = await params;
  return <CallDetailScreen callId={id} />;
} 