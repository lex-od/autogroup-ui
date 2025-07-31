'use client';

import { useLoginMutation } from '@/services/api/auth.api';
import LoginForm from './login-form';

const Login = () => {
  const { mutate } = useLoginMutation();

  return <LoginForm onSubmit={mutate} />;
};

export default Login;
