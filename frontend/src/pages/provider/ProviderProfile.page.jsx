import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProviderProfile,
  updateProviderProfile,
  uploadProviderProfileImage,
  toggleAvailability,
} from "../../features/provider/provider.slice";

const ProviderProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector(
    (s) => s.provider
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    skills: "",
    experience: 0,
  });

  useEffect(() => {
    dispatch(fetchProviderProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name,
        phone: profile.phone,
        skills: profile.skills.join(", "),
        experience: profile.experience,
      });
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProviderProfile({
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
      })
    );
  };

  const handleImage = (e) => {
    dispatch(uploadProviderProfileImage(e.target.files[0]));
  };

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">Provider Profile</h1>

      {loading && (
        <span className="loading loading-spinner"></span>
      )}

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

      {/* AVAILABILITY */}
      <div className="flex items-center gap-3">
        <span className="font-medium">Availability</span>
        <input
          type="checkbox"
          className="toggle toggle-success"
          checked={profile?.isAvailable}
          onChange={(e) =>
            dispatch(toggleAvailability(e.target.checked))
          }
        />
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="input input-bordered w-full"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          placeholder="Name"
        />

        <input
          className="input input-bordered w-full"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          placeholder="Phone"
        />

        <input
          className="input input-bordered w-full"
          value={form.skills}
          onChange={(e) =>
            setForm({ ...form, skills: e.target.value })
          }
          placeholder="Skills (comma separated)"
        />

        <input
          type="number"
          className="input input-bordered w-full"
          value={form.experience}
          onChange={(e) =>
            setForm({
              ...form,
              experience: Number(e.target.value),
            })
          }
          placeholder="Experience (years)"
        />

        <button className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProviderProfilePage;
