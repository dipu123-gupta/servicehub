import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar
        title="Admin Panel"
        links={[
          { label: "Dashboard", to: "/admin/dashboard" },
          { label: "Users", to: "/admin/users" },
          { label: "Providers", to: "/admin/providers" },
          { label: "Payments", to: "/admin/payments" },
          { label: "Withdraw Requests", to: "/admin/withdraws" },
        ]}
      />
      <div className="flex-1">
        <Navbar role="ADMIN" />
        <main className="p-6 bg-base-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
