import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWithdraws,
  approveWithdraw,
  rejectWithdraw,
} from "../../features/admin/admin.slice";

const AdminWithdrawsPage = () => {
  const dispatch = useDispatch();
  const { withdraws=[], loading } = useSelector((s) => s.admin);

  useEffect(() => {
    dispatch(fetchWithdraws());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Withdraw Requests</h1>

      {loading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {!loading && withdraws.length === 0 && (
        <p className="text-center text-gray-500">
          No withdraw requests found
        </p>
      )}

      {!loading &&
        withdraws.map((w) => (
          <div key={w._id} className="card bg-base-100 shadow">
            <div className="card-body flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="font-semibold">
                  Provider: {w.providerId?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Amount: ₹{w.amount}
                </p>
                <p className="text-xs">
                  Requested at:{" "}
                  {new Date(w.createdAt).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => dispatch(approveWithdraw(w._id))}
                >
                  Approve
                </button>

                <button
                  className="btn btn-error btn-sm"
                  onClick={() => dispatch(rejectWithdraw(w._id))}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AdminWithdrawsPage;
