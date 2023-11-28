import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Loading></Loading>;
  }

  if (user && isAdmin) {
    return children;
  }
  return (
    <Navigate
      to="/login"
      state={{ from: location.pathname }}
      replace
    ></Navigate>
  );
};
export default AdminRoute;
