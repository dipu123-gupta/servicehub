import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ROLES } from "../features/auth/auth.types";

const PublicRoute = () => {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated) {
    if (role === ROLES.USER) return <Navigate to="/user/dashboard" replace />;
    if (role === ROLES.PROVIDER) return <Navigate to="/provider/dashboard" replace />;
    if (role === ROLES.ADMIN) return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
