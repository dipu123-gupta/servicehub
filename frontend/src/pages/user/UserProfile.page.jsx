import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
  uploadUserProfileImage,
} from "../../features/user/user.slice";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((s) => s.user);

  const [form, setForm] = useState({ name: "", phone: "" });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name,
        phone: profile.phone,
      });
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(form));
  };

  const handleImage = (e) => {
    dispatch(uploadUserProfileImage(e.target.files[0]));
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>

      {error && <div className="alert alert-error">{error}</div>}

      {/* AVATAR */}
      <div className="flex items-center gap-4">
        <img
          src={profile?.avatar || "https://placehold.co/100"}
          alt="avatar"
          className="w-24 h-24 rounded-full border"
        />

        <input
          type="file"
          className="file-input file-input-bordered"
          onChange={handleImage}
        />
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={form.name}
          className="input input-bordered w-full"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          value={form.phone}
          className="input input-bordered w-full"
          placeholder="Phone"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <button className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfilePage;
