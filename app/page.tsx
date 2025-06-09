'use client';

import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/auth/auth-store-provider';
import { useGlobalStore } from '@/stores/global/global-store-provider';

export default function Home() {
  const { token, setToken, unsetToken } = useAuthStore((state) => state);
  const { someNumber, incSomeNumber } = useGlobalStore((state) => state.hello);

  const { refetch } = useQuery({
    queryKey: ['users'],
    enabled: false,
    queryFn: async () => {
      const res = await fetch('/api/users', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer token123',
        },
      });
      return res.json();
    },
  });

  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-4xl">Basic elements</h1>

      <div className="grid max-w-sm gap-4">
        <Input />

        <div>
          <Button onClick={() => refetch()}>Fetch users (with token)</Button>
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
}
