import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWithdrawRequests,
  approveWithdraw,
  rejectWithdraw,
} from "../../features/adminWithdraw/adminWithdraw.slice";

const WithdrawRequestsPage = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.adminWithdraw);

  useEffect(() => {
    dispatch(fetchWithdrawRequests());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Withdraw Requests</h1>

      {loading && (
        <span className="loading loading-spinner loading-lg"></span>
      )}

      {!loading && list.length === 0 && (
        <p className="text-gray-500 text-center">
          No pending withdraw requests
        </p>
      )}

      {list.map((w) => (
        <div key={w._id} className="card bg-base-100 shadow">
          <div className="card-body flex-row justify-between items-center">
            <div>
              <p className="font-semibold">Provider ID</p>
              <p className="text-sm">{w.providerId}</p>
              <p className="mt-1">
                Amount: <b>₹{w.amount}</b>
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

export default WithdrawRequestsPage;
