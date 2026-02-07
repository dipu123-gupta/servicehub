const STEPS = [
  "PROVIDER_ASSIGNED",
  "ACCEPTED",
  "OTP_VERIFIED",
  "WORK_STARTED",
  "COMPLETED",
];

const LABELS = {
  PROVIDER_ASSIGNED: "Job Assigned",
  ACCEPTED: "Accepted",
  OTP_VERIFIED: "OTP Verified",
  WORK_STARTED: "Work Started",
  COMPLETED: "Completed",
};

const JobTimeline = ({ status }) => {
  const currentIndex = STEPS.indexOf(status);

  return (
    <ul className="steps steps-vertical md:steps-horizontal w-full">
      {STEPS.map((step, index) => (
        <li
          key={step}
          className={`step ${
            index <= currentIndex ? "step-primary" : ""
          }`}
        >
          {LABELS[step]}
        </li>
      ))}
    </ul>
  );
};

export default JobTimeline;
