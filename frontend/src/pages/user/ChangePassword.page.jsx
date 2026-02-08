import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../features/user/user.slice";

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.user);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState({});

  /* ================= VALIDATION ================= */
  const validate = () => {
    const e = {};

    if (!form.currentPassword)
      e.currentPassword = "Current password required";

    if (!form.newPassword || form.newPassword.length < 6)
      e.newPassword = "Password must be at least 6 characters";

    if (form.newPassword !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";

    setFormError(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(
      changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      })
    );
  };

  return (
    <div className="max-w-md space-y-6">
      <h1 className="text-2xl font-bold">Change Password</h1>

      {error && (
        <div className="alert alert-error text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="password"
          placeholder="Current Password"
          className={`input input-bordered w-full ${
            formError.currentPassword && "input-error"
          }`}
          onChange={(e) =>
            setForm({ ...form, currentPassword: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="New Password"
          className={`input input-bordered w-full ${
            formError.newPassword && "input-error"
          }`}
          onChange={(e) =>
            setForm({ ...form, newPassword: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className={`input input-bordered w-full ${
            formError.confirmPassword && "input-error"
          }`}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />

        <button
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
