'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth/auth-store-provider';
import { useHelloUsersQuery } from '@/services/api/hello-hooks';

const DashboardHome = () => {
  const unsetToken = useAuthStore((state) => state.unsetToken);

  const { data: users } = useHelloUsersQuery();

  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-4xl">Dashboard</h1>

      <div className="grid grid-flow-col justify-start gap-4">
        <Link className="underline" href="/">
          Go Home
        </Link>
      </div>

      <div className="grid max-w-sm gap-4">
        <div className="grid grid-flow-col justify-start gap-4">
          <Button variant="secondary" onClick={() => unsetToken()}>
            Logout
          </Button>
        </div>
      </div>

      <div>
        {users?.map((user) => (
          <div key={user.id}>
            {user.name} - {user.email}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
