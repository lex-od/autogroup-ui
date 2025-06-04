'use client';

import { useGlobalStore } from '@/components/providers/global-store-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  const { token, setToken } = useGlobalStore((state) => state.auth);
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

      <p>Store token: {token}</p>
      <div>
        <Button onClick={() => setToken((token || '') + 'qwe ')}>
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
