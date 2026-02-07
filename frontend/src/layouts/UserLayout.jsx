import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ROLES } from "../features/auth/auth.types";

const UserLayout = () => {
  return (
    <>
      <Navbar role={ROLES.USER} />
      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
};

export default UserLayout;
