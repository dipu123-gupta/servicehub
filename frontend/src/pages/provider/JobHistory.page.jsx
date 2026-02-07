import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobHistory } from "../../features/providerJobs/providerJobs.slice";

const statusBadge = (status) => {
  if (status === "COMPLETED") return "badge-success";
  if (status === "CANCELLED") return "badge-error";
  return "badge-info";
};

const JobHistoryPage = () => {
  const dispatch = useDispatch();
  const { history, loading } = useSelector((s) => s.providerJobs);

  useEffect(() => {
    dispatch(fetchJobHistory());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Job History</h1>

      {loading && (
        <span className="loading loading-spinner loading-lg"></span>
      )}

      {!loading && history.length === 0 && (
        <p className="text-center text-gray-500">
          No completed jobs yet
        </p>
      )}

      {history.map((job) => (
        <div key={job._id} className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex justify-between">
              <h2 className="font-semibold">
                {job.serviceId?.title}
              </h2>
              <span className={`badge ${statusBadge(job.status)}`}>
                {job.status}
              </span>
            </div>

            <p className="text-sm text-gray-600">
              Customer: {job.userId?.name}
            </p>

            <p className="text-sm">
              Address: {job.address}
            </p>

            <p className="text-sm">
              Scheduled: {new Date(job.schedule).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobHistoryPage;
