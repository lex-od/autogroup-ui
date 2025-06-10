'use client';
import DashboardHome from '@/components/screens/dashboard-home/dashboard-home';
import { useAuthStore } from '@/stores/auth/auth-store-provider';

export default function DashboardHomePage() {
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  if (!hasHydrated) {
    return null;
  }
  return <DashboardHome />;
}
