import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBookings } from "../../features/bookings/booking.slice";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Dashboard</h1>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* BOOKINGS */}
      {!loading && (
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="text-lg font-semibold mb-3">
              My Bookings
            </h2>

            {list.length === 0 ? (
              <p className="text-gray-500 text-center">
                No bookings found
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Status</th>
                      <th>Schedule</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((b) => (
                      <tr key={b._id}>
                        <td>{b.serviceId?.title}</td>
                        <td>
                          <span className="badge badge-info">
                            {b.status}
                          </span>
                        </td>
                        <td>{b.schedule}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
