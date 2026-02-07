import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProviderJobs,
  acceptJob,
  verifyOtp,
  startWork,
  completeJob,
} from "../../features/providerJobs/providerJobs.slice";

const ProviderDashboard = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.providerJobs);
  const [otpInput, setOtpInput] = useState({});
  const [showOtpFor, setShowOtpFor] = useState(null);

  useEffect(() => {
    dispatch(fetchProviderJobs());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Provider Dashboard</h1>

      {loading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {!loading && list.length === 0 && (
        <p className="text-center text-gray-500">No jobs assigned</p>
      )}

      {!loading &&
        list.map((job) => (
          <div key={job._id} className="card bg-base-100 shadow">
            <div className="card-body space-y-2">
              <h2 className="font-semibold">
                {job.serviceId?.title}
              </h2>
              <p>Status: <b>{job.status}</b></p>

              {/* ACTIONS */}
              {job.status === "PROVIDER_ASSIGNED" && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => dispatch(acceptJob(job._id))}
                >
                  Accept Job
                </button>
              )}

              {job.status === "ACCEPTED" && (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="input input-bordered input-sm"
                    onChange={(e) =>
                      setOtpInput({ ...otpInput, [job._id]: e.target.value })
                    }
                  />
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() =>
                      dispatch(
                        verifyOtp({
                          id: job._id,
                          otp: otpInput[job._id],
                        })
                      )
                    }
                  >
                    Verify OTP
                  </button>
                </>
              )}

              {job.status === "OTP_VERIFIED" && (
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => dispatch(startWork(job._id))}
                >
                  Start Work
                </button>
              )}

              {job.status === "WORK_STARTED" && (
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => dispatch(completeJob(job._id))}
                >
                  Complete Job
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProviderDashboard;
