import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const ProviderLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar
        title="Provider Panel"
        links={[
          { label: "Dashboard", to: "/provider/dashboard" },
          { label: "Jobs", to: "/provider/jobs" },
          { label: "Wallet", to: "/provider/wallet" },
          { label: "Profile", to: "/provider/profile" },
        ]}
      />

      <div className="flex-1">
        <Navbar role="PROVIDER" />
        <main className="p-6 bg-base-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProviderLayout;
