import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboard,
  fetchProviders,
  verifyProvider,
} from "../../features/admin/admin.slice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, providers, loading } = useSelector((s) => s.admin);

  // useEffect(() => {
  //   dispatch(fetchDashboard());
  //   dispatch(fetchProviders());
  // }, [dispatch]);

  useEffect(() => {
  if (!list.length) {
    dispatch(fetchDashboard());
    dispatch(fetchProviders());
  }
}, [dispatch, list.length]);


  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* STATS */}
      {stats && (
        <div className="grid grid-cols-4 gap-4">
          <div className="stat bg-base-100 shadow">
            <div className="stat-title">Users</div>
            <div className="stat-value">{stats.stats.users}</div>
          </div>
          <div className="stat bg-base-100 shadow">
            <div className="stat-title">Providers</div>
            <div className="stat-value">{stats.stats.providers}</div>
          </div>
          <div className="stat bg-base-100 shadow">
            <div className="stat-title">Bookings</div>
            <div className="stat-value">{stats.stats.bookings}</div>
          </div>
          <div className="stat bg-base-100 shadow">
            <div className="stat-title">Revenue</div>
            <div className="stat-value">₹{stats.stats.revenue / 100}</div>
          </div>
        </div>
      )}

      {/* PROVIDERS */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Pending Providers</h2>

        {loading && <span className="loading loading-spinner"></span>}

        {providers
          .filter((p) => !p.isVerified)
          .map((p) => (
            <div key={p._id} className="card bg-base-100 shadow mb-3">
              <div className="card-body flex-row justify-between items-center">
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm">{p.email}</p>
                </div>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => dispatch(verifyProvider(p._id))}
                >
                  Verify
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
