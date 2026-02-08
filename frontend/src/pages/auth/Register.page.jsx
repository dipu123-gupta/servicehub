import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, registerProvider } from "../../features/auth/auth.slice";
import { ROLES } from "../../features/auth/auth.types";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);

  const [role, setRole] = useState(ROLES.USER);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    skills: "",
  });

  const [formError, setFormError] = useState({});

  /* ================= VALIDATION ================= */
  const validate = () => {
    const e = {};

    if (!form.name) e.name = "Name required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.password || form.password.length < 6)
      e.password = "Min 6 chars password";
    if (!/^[6-9]\d{9}$/.test(form.phone))
      e.phone = "Valid Indian phone required";

    if (role === ROLES.PROVIDER && !form.skills)
      e.skills = "Skills required";

    setFormError(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (role === ROLES.USER) {
      dispatch(registerUser(form)).then((res) => {
        if (!res.error) navigate("/login");
      });
    } else {
      dispatch(
        registerProvider({
          ...form,
          skills: form.skills.split(",").map((s) => s.trim()),
          location: { coordinates: [77.1025, 28.7041] }, // demo
        })
      ).then((res) => {
        if (!res.error) navigate("/login");
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-white text-center">Create Account</h2>

          {error && (
            <div className="alert alert-error text-sm">{error}</div>
          )}

          {/* ROLE */}
          <select
            className="select select-bordered w-full mt-3 text-amber-100"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value={ROLES.USER}>User</option>
            <option value={ROLES.PROVIDER}>Provider</option>
          </select>

          <form onSubmit={handleSubmit} className="space-y-3 mt-3 text-amber-100">
            <input
              placeholder="Full Name"
              className={`input input-bordered w-full ${
                formError.name && "input-error"
              }`}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Email"
              className={`input input-bordered w-full ${
                formError.email && "input-error"
              }`}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              className={`input input-bordered w-full ${
                formError.password && "input-error"
              }`}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <input
              placeholder="Phone"
              className={`input input-bordered w-full ${
                formError.phone && "input-error"
              }`}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            {role === ROLES.PROVIDER && (
              <input
                placeholder="Skills (comma separated)"
                className={`input input-bordered w-full ${
                  formError.skills && "input-error"
                }`}
                onChange={(e) =>
                  setForm({ ...form, skills: e.target.value })
                }
              />
            )}

            <button
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          <p className="text-center text-sm mt-3">
            Already have account?{" "}
            <span
              className="link link-primary"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
