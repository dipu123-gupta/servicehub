import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RoleRoute = ({ allowedRoles }) => {
  const { role } = useAuth();

  return allowedRoles.includes(role)
    ? <Outlet />
    : <Navigate to="/login" replace />;
};

export default RoleRoute;
