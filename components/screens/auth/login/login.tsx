'use client';

import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { useAuthStore } from '@/stores/auth/auth-store-provider';
import LoginForm, { type LoginFormState } from './login-form';

const Login = () => {
  const setToken = useAuthStore((state) => state.setToken);

  const { mutate } = useMutation<
    { token: string },
    Error,
    { email: string; password: string }
  >({
    mutationFn: async (params) => {
      const { data } = await axios.post('/api/hello/login', params);
      return data;
    },
    onSuccess: ({ token }) => {
      setToken(token);
    },
  });

  const handleSubmit = (values: LoginFormState) => {
    mutate(values);
  };

  return <LoginForm onSubmit={handleSubmit} />;
};

export default Login;
