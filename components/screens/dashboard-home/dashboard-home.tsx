'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/auth/auth-store-provider';
import { useGlobalStore } from '@/stores/global/global-store-provider';
import { useHelloUsersQuery } from '@/services/api/hello-hooks';

const DashboardHome = () => {
  const token = useAuthStore((state) => state.token);
  const setToken = useAuthStore((state) => state.setToken);
  const unsetToken = useAuthStore((state) => state.unsetToken);
  const { someNumber, incSomeNumber } = useGlobalStore((state) => state.hello);

  const { refetch } = useHelloUsersQuery();

  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-4xl">DashboardHome</h1>

      <div className="grid max-w-sm gap-4">
        <Input />

        <div>
          <Button onClick={() => refetch()}>Fetch users</Button>
        </div>

        <p>Store token: {token}</p>
        <div className="grid grid-flow-col justify-start gap-4">
          <Button onClick={() => setToken('token123')}>Set token</Button>
          <Button variant="secondary" onClick={() => unsetToken()}>
            Unset token
          </Button>
        </div>

        <p>Store someNumber: {someNumber}</p>
        <div>
          <Button onClick={incSomeNumber}>Increase someNumber</Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
