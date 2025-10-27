import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Checks for the flag in local storage
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';

  // If not authenticated, redirects to the login page
  return isAuth ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;