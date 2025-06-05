'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/auth/auth-store-provider';
import { useGlobalStore } from '@/stores/global/global-store-provider';
import useStore from '@/stores/use-store';

export default function Home() {
  const auth = useStore(useAuthStore, (state) => state);
  const { someNumber, incSomeNumber } = useGlobalStore((state) => state.hello);

  const handleOk = () => {
    fetch('/api/users', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer token123',
      },
    });
  };

  return (
    <div className="grid gap-4 p-4">
      <h1>Basic elements</h1>

      <Input className="max-w-xs" />

      <div className="grid auto-cols-max grid-flow-col gap-4">
        <Button className="min-w-20" onClick={handleOk}>
          Fetch users (with token)
        </Button>
        <Button className="min-w-20" variant="secondary">
          Cancel
        </Button>
      </div>

      <p>Store token: {auth?.token}</p>
      <div>
        <Button onClick={() => auth?.setToken((auth?.token || '') + 'qwe ')}>
          Add store token symbols
        </Button>
      </div>

      <p>Store someNumber: {someNumber}</p>
      <div>
        <Button onClick={incSomeNumber}>Increase someNumber</Button>
      </div>
    </div>
  );
}
