import { useSelector } from "react-redux";

const useAuth = () => {
  const { isAuthenticated, role, loading } = useSelector(
    (state) => state.auth
  );

  return {
    isAuthenticated,
    role,
    loading,
  };
};

export default useAuth;
