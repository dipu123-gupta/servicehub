import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import PublicRoute from "./routes/PublicRoute";
import { ROLES } from "./features/auth/auth.types";

import LoginPage from "./pages/auth/Login.page";

import UserLayout from "./layouts/UserLayout";
import ProviderLayout from "./layouts/ProviderLayout";
import AdminLayout from "./layouts/AdminLayout";

import UserDashboard from "./pages/user/UserDashboard.page";
import ProviderDashboard from "./pages/provider/ProviderDashboard.page";
import AdminDashboard from "./pages/admin/AdminDashboard.page";

const App = () => {
  return (
    <Routes>
      {/* ROOT */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* PUBLIC (login) */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* PROTECTED */}
      <Route element={<ProtectedRoute />}>
        {/* USER */}
        <Route element={<RoleRoute allowedRoles={[ROLES.USER]} />}>
          <Route path="/user" element={<UserLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
          </Route>
        </Route>

        {/* PROVIDER */}
        <Route element={<RoleRoute allowedRoles={[ROLES.PROVIDER]} />}>
          <Route path="/provider" element={<ProviderLayout />}>
            <Route path="dashboard" element={<ProviderDashboard />} />
          </Route>
        </Route>

        {/* ADMIN */}
        <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
