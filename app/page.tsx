'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
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
          Ok
        </Button>
        <Button className="min-w-20" variant="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
}
