import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProviderJobs,
  acceptJob,
  verifyOtp,
  startWork,
  completeJob,
} from "../../features/providerJobs/providerJobs.slice";
import JobTimeline from "../../components/JobTimeline";
import { rejectJob } from "../../features/providerJobs/providerJobs.slice";

const ProviderDashboard = () => {
  const dispatch = useDispatch();
  const {
    list = [],
    loading,
    error,
  } = useSelector((state) => state.providerJobs);

  const [otpInput, setOtpInput] = useState({});

  useEffect(() => {
    dispatch(fetchProviderJobs());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <h1 className="text-2xl font-bold">Provider Dashboard</h1>

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

      {/* EMPTY */}
      {!loading && !error && list.length === 0 && (
        <p className="text-center text-gray-500">No jobs assigned</p>
      )}

      {/* JOB CARDS */}
      {!loading &&
        !error &&
        list.map((job) => (
          <div key={job._id} className="card bg-base-100 shadow">
            <div className="card-body space-y-4">
              {/* TITLE */}
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">
                  {job.serviceId?.title}
                </h2>
                <span className="badge badge-outline">{job.status}</span>
              </div>

              {/* 🔥 JOB TIMELINE */}
              <JobTimeline status={job.status} />

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-2">
                {job.status === "PROVIDER_ASSIGNED" && (
                  <div className="flex gap-2">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => dispatch(acceptJob(job._id))}
                    >
                      Accept
                    </button>

                    <button
                      className="btn btn-error btn-outline btn-sm"
                      onClick={() => dispatch(rejectJob(job._id))}
                    >
                      Reject
                    </button>
                  </div>
                )}

                {job.status === "ACCEPTED" && (
                  <>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      className="input input-bordered input-sm"
                      value={otpInput[job._id] || ""}
                      onChange={(e) =>
                        setOtpInput({
                          ...otpInput,
                          [job._id]: e.target.value,
                        })
                      }
                    />
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() =>
                        dispatch(
                          verifyOtp({
                            id: job._id,
                            otp: otpInput[job._id],
                          }),
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
          </div>
        ))}
    </div>
  );
};

export default ProviderDashboard;
