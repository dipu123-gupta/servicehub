import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobHistory } from "../../features/providerJobs/providerJobs.slice";

const statusBadge = (status) => {
  switch (status) {
    case "COMPLETED":
      return "badge-success";
    case "CANCELLED":
      return "badge-error";
    case "WORK_STARTED":
      return "badge-warning";
    default:
      return "badge-info";
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    dateStyle: "medium",
  });
};

const JobHistoryPage = () => {
  const dispatch = useDispatch();
  const { history, loading, error } = useSelector(
    (s) => s.providerJobs
  );

  useEffect(() => {
    dispatch(fetchJobHistory());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Job History</h1>

      {loading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {!loading && history.length === 0 && (
        <p className="text-center text-gray-500">
          No completed jobs yet
        </p>
      )}

      {!loading && history.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-zebra bg-base-100 shadow">
            <thead>
              <tr>
                <th>Service</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {history.map((job) => (
                <tr key={job._id}>
                  <td className="font-medium">
                    {job.serviceId?.title}
                  </td>
                  <td>{formatDate(job.schedule)}</td>
                  <td>
                    <span
                      className={`badge ${statusBadge(job.status)}`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td>₹{job.amount || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobHistoryPage;
