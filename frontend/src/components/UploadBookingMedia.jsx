import { useDispatch, useSelector } from "react-redux";
import { uploadBookingMedia } from "../features/bookings/booking.slice";
import { useState } from "react";

const UploadBookingMedia = ({ bookingId }) => {
  const dispatch = useDispatch();
  const { uploadLoading } = useSelector((s) => s.bookings);

  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) return;
    dispatch(uploadBookingMedia({ id: bookingId, file }));
    setFile(null);
  };

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body space-y-3">
        <h3 className="font-semibold">Upload Service Media</h3>

        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="btn btn-primary btn-sm"
          disabled={uploadLoading || !file}
          onClick={handleUpload}
        >
          {uploadLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Upload"
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadBookingMedia;
