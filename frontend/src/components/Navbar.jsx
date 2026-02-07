import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/auth.slice";

const Navbar = ({ role }) => {
  const dispatch = useDispatch();

  return (
    <nav className="flex items-center justify-between bg-gray-900 text-white px-6 py-4">
      <h1 className="text-lg font-semibold">LocalServesHub</h1>

      <div className="flex items-center gap-4">
        <span className="px-3 py-1 bg-blue-600 rounded text-sm">
          {role}
        </span>

        <button
          onClick={() => dispatch(logoutUser())}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
