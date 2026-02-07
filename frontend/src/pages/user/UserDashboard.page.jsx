import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyBookings,
  cancelBooking,
} from "../../features/bookings/booking.slice";

/* ================= HELPERS ================= */

const statusBadge = (status) => {
  switch (status) {
    case "COMPLETED":
      return "badge-success";
    case "CANCELLED":
      return "badge-error";
    case "ACCEPTED":
      return "badge-primary";
    case "WORK_STARTED":
      return "badge-warning";
    default:
      return "badge-info";
  }
};

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

/* ================= COMPONENT ================= */

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { list = [], loading, error } = useSelector(
    (state) => state.bookings
  );

  const [cancelId, setCancelId] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      {/* TITLE */}
      <h1 className="text-2xl font-bold">My Bookings</h1>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {/* BOOKINGS TABLE */}
      {!loading && !error && (
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            {list.length === 0 ? (
              <p className="text-center text-gray-500">
                You have not made any bookings yet
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Status</th>
                      <th>Schedule</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {list.map((b) => (
                      <tr key={b._id}>
                        <td className="font-medium">
                          {b.serviceId?.title || "—"}
                        </td>

                        <td>
                          <span
                            className={`badge ${statusBadge(b.status)}`}
                          >
                            {b.status}
                          </span>
                        </td>

                        <td>{formatDate(b.schedule)}</td>

                        <td className="space-x-2">
                          <button className="btn btn-sm btn-outline">
                            View
                          </button>

                          {b.status !== "CANCELLED" &&
                            b.status !== "COMPLETED" && (
                              <button
                                className="btn btn-sm btn-error"
                                onClick={() => setCancelId(b._id)}
                              >
                                Cancel
                              </button>
                            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= CANCEL MODAL ================= */}
      {cancelId && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Cancel Booking
            </h3>

            <textarea
              className="textarea textarea-bordered w-full mt-4"
              placeholder="Reason (optional)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => {
                  setCancelId(null);
                  setReason("");
                }}
              >
                Close
              </button>

              <button
                className="btn btn-error"
                onClick={() => {
                  dispatch(
                    cancelBooking({
                      id: cancelId,
                      reason,
                    })
                  );
                  setCancelId(null);
                  setReason("");
                }}
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
