'use client';

import { useAuthStore } from '@/stores/auth/auth-store-provider';
import { useLoginMutation } from '@/services/api/auth-hooks';
import LoginForm from './login-form';

const Login = () => {
  const setToken = useAuthStore((state) => state.setToken);

  const { mutate } = useLoginMutation({
    onSuccess: ({ token }) => {
      setToken(token);
    },
  });

  return <LoginForm onSubmit={mutate} />;
};

export default Login;
