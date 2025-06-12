import PublicRoute from '@/components/core/public-route';
import Home from '@/components/screens/home/home';

const HomePage = () => {
  return (
    <PublicRoute>
      <Home />
    </PublicRoute>
  );
};

export default HomePage;
