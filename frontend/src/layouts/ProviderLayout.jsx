import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ROLES } from "../features/auth/auth.types";

const ProviderLayout = () => {
  return (
    <>
      <Navbar role={ROLES.PROVIDER} />

      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
};

export default ProviderLayout;
