import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../features/bookings/booking.slice";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";

const CreateBookingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.bookings);

  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    serviceId: "",
    address: "",
    schedule: "",
    problemDescription: "",
  });

  /* LOAD SERVICES */
  useEffect(() => {
    api.get("/services").then((res) => {
      setServices(res.data.services || []);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.serviceId || !form.address || !form.schedule) {
      return alert("All required fields must be filled");
    }

    const payload = {
      ...form,
      location: { lat: 0, lng: 0 }, // later GPS add karenge
    };

    const res = await dispatch(createBooking(payload));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/user/dashboard");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Book a Service
      </h1>

      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 shadow p-6 space-y-4"
      >
        {/* SERVICE */}
        <select
          name="serviceId"
          className="select select-bordered w-full"
          onChange={handleChange}
        >
          <option value="">Select Service</option>
          {services.map((s) => (
            <option key={s._id} value={s._id}>
              {s.title}
            </option>
          ))}
        </select>

        {/* ADDRESS */}
        <textarea
          name="address"
          className="textarea textarea-bordered w-full"
          placeholder="Service Address"
          onChange={handleChange}
        />

        {/* DATE */}
        <input
          type="datetime-local"
          name="schedule"
          className="input input-bordered w-full"
          onChange={handleChange}
        />

        {/* DESCRIPTION */}
        <textarea
          name="problemDescription"
          className="textarea textarea-bordered w-full"
          placeholder="Problem description (optional)"
          onChange={handleChange}
        />

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Confirm Booking"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateBookingPage;
