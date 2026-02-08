import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/auth/auth.slice";
import { ROLES } from "../../features/auth/auth.types";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, role, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: ROLES.USER,
  });

  const [formError, setFormError] = useState({});

  /* ================= VALIDATION ================= */
  const validate = () => {
    const errors = {};

    if (!form.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Invalid email format";
    }

    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError({ ...formError, [e.target.name]: "" });
  };
  // LoginPage.jsx → handleSubmit()
const handleSubmit = (e) => {
  e.preventDefault();
  if (!validate()) return;

  dispatch(
    loginUser({
      email: form.email.trim(),
      password: form.password,
      role: form.role.toUpperCase(), // 🔥 FINAL FIX
    })
  );
};

  /* ================= AUTO REDIRECT ================= */
  useEffect(() => {
    if (!isAuthenticated || !role) return;

    if (role === ROLES.USER) navigate("/user/dashboard", { replace: true });
    if (role === ROLES.PROVIDER)
      navigate("/provider/dashboard", { replace: true });
    if (role === ROLES.ADMIN) navigate("/admin/dashboard", { replace: true });
  }, [isAuthenticated, role, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-white text-center">
            LocalServesHub
          </h2>
          <p className="text-center text-gray-500 mb-4">Login to continue</p>

          {/* BACKEND ERROR */}
          {error && (
            <div className="alert alert-error text-sm mb-3">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 text-amber-100">
            {/* EMAIL */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className={`input input-bordered w-full ${
                  formError.email ? "input-error" : ""
                }`}
                value={form.email}
                onChange={handleChange}
              />
              {formError.email && (
                <p className="text-error text-sm mt-1">{formError.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`input input-bordered w-full ${
                  formError.password ? "input-error" : ""
                }`}
                value={form.password}
                onChange={handleChange}
              />
              {formError.password && (
                <p className="text-error text-sm mt-1">{formError.password}</p>
              )}
            </div>

            {/* ROLE */}
            <select
              name="role"
              className="select select-bordered w-full"
              value={form.role}
              onChange={handleChange}
            >
              <option value={ROLES.USER}>User</option>
              <option value={ROLES.PROVIDER}>Provider</option>
              <option value={ROLES.ADMIN}>Admin</option>
            </select>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full mt-2"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
