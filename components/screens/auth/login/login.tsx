'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth/auth-store-provider';

const Login = () => {
  const setToken = useAuthStore((state) => state.setToken);

  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-4xl">Login</h1>

      <div className="grid grid-flow-col justify-start gap-4">
        <Link className="underline" href="/">
          Go Home
        </Link>
      </div>

      <div className="grid max-w-sm gap-4">
        <div className="grid grid-flow-col justify-start gap-4">
          <Button onClick={() => setToken('token123')}>Login</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
