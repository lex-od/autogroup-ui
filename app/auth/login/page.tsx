import PublicRoute from '@/components/core/public-route';
import Login from '@/components/screens/auth/login/login';

const LoginPage = () => {
  return (
    <PublicRoute isProtected>
      <Login />
    </PublicRoute>
  );
};

export default LoginPage;
