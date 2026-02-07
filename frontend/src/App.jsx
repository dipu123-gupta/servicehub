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
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./features/auth/auth.slice";
import BookingDetailPage from "./pages/user/BookingDetail.page.jsx";
import WalletPage from "./pages/provider/Wallet.page.jsx";
import NotificationsPage from "./pages/common/Notifications.page.jsx";
import WithdrawRequestsPage from "./pages/admin/WithdrawRequests.page.jsx";
import JobHistoryPage from "./pages/provider/JobHistory.page.jsx";
import PaymentsPage from "./pages/admin/Payments.page.jsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

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
        <Route path="/notifications" element={<NotificationsPage/>} />

        {/* USER */}
        <Route element={<RoleRoute allowedRoles={[ROLES.USER]} />}>
          <Route path="/user" element={<UserLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="bookings/:id" element={<BookingDetailPage />} />{" "}
            {/* ✅ */}
          </Route>
        </Route>

        {/* PROVIDER */}
        <Route element={<RoleRoute allowedRoles={[ROLES.PROVIDER]} />}>
          <Route path="/provider" element={<ProviderLayout />}>
            <Route path="dashboard" element={<ProviderDashboard />} />
            <Route path="/provider/wallet" element={<WalletPage />} />
            <Route path="/provider/history" element={<JobHistoryPage />} />

          </Route>
        </Route>

        {/* ADMIN */}
        <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="/admin/withdraws" element={<WithdrawRequestsPage />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="/admin/payments" element={<PaymentsPage />} />

          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
