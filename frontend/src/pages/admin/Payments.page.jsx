import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPayments,
  fetchRevenue,
  fetchCommission,
} from "../../features/admin/admin.slice";

const PaymentsPage = () => {
  const dispatch = useDispatch();
  const { payments, revenue, commission, loading } = useSelector(
    (s) => s.admin
  );

  useEffect(() => {
    dispatch(fetchPayments());
    dispatch(fetchRevenue());
    dispatch(fetchCommission());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Payments & Revenue</h1>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value">
            ₹{revenue?.total / 100 || 0}
          </div>
        </div>

        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Commission</div>
          <div className="stat-value">
            ₹{commission?.total / 100 || 0}
          </div>
        </div>

        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Payments</div>
          <div className="stat-value">{payments.length}</div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="font-semibold mb-3">Payment Records</h2>

          {loading && (
            <span className="loading loading-spinner"></span>
          )}

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p._id}>
                    <td>{p.userId?.email}</td>
                    <td>₹{p.amount / 100}</td>
                    <td>
                      <span className="badge badge-success">
                        {p.status}
                      </span>
                    </td>
                    <td>
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
