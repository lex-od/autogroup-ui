import PrivateRoute from '@/components/core/private-route';
import DashboardHome from '@/components/screens/dashboard-home/dashboard-home';

const DashboardHomePage = () => {
  return (
    <PrivateRoute>
      <DashboardHome />
    </PrivateRoute>
  );
};

export default DashboardHomePage;
