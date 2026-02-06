import { useDispatch, useSelector } from "react-redux";
import { authSuccess } from "./features/auth/auth.slice";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <div className="p-10">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() =>
          dispatch(
            authSuccess({
              user: { name: "Test User" },
              role: "USER",
            })
          )
        }
      >
        Login Test
      </button>

      <pre className="mt-4 bg-gray-100 p-4 rounded">
        {JSON.stringify(auth, null, 2)}
      </pre>
    </div>
  );
};

export default App;
