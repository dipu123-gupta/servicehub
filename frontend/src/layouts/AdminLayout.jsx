import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ROLES } from "../features/auth/auth.types";

const AdminLayout = () => {
  return (
    <>
      <Navbar role={ROLES.ADMIN} />

      <main className="p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
