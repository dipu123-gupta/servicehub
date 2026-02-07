import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar
        title="User Panel"
        links={[
          { label: "Dashboard", to: "/user/dashboard" },
          // { label: "My Bookings", to: "/user/bookings" },
          // { label: "Profile", to: "/user/profile" },
        ]}
      />

      <div className="flex-1">
        <Navbar role="USER" />
        <main className="p-6 bg-base-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
