import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  generateInvoice,
  downloadInvoice,
} from "../../features/invoice/invoice.slice";
import {
  fetchBookingById,
  clearSelectedBooking,
} from "../../features/bookings/booking.slice";
import { cancelBooking } from "../../features/bookings/booking.slice";
import UploadBookingMedia from "../../components/UploadBookingMedia";

/* ================= HELPERS ================= */

const statusBadge = (status) => {
  switch (status) {
    case "COMPLETED":
      return "badge-success";
    case "CANCELLED":
      return "badge-error";
    case "ACCEPTED":
      return "badge-primary";
    case "WORK_STARTED":
      return "badge-warning";
    default:
      return "badge-info";
  }
};

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

/* ================= PAGE ================= */

const BookingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelReason, setCancelReason] = useState("");
  const [showCancel, setShowCancel] = useState(false);

  const {
    selected: booking,
    loading,
    error,
  } = useSelector((state) => state.bookings);

  const { current: invoice, loading: invoiceLoading } = useSelector(
    (state) => state.invoice,
  );

  useEffect(() => {
    dispatch(fetchBookingById(id));

    // cleanup on unmount
    return () => {
      dispatch(clearSelectedBooking());
    };
  }, [dispatch, id]);

  /* LOADING */
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  /* ERROR */
  if (error) {
    return (
      <div className="alert alert-error">
        <span>{error}</span>
      </div>
    );
  }

  if (!booking) return null;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Booking Details</h1>
        <button className="btn btn-sm btn-outline" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      {/* UPLOAD MEDIA */}
      {booking.status !== "CANCELLED" && booking.status !== "COMPLETED" && (
        <UploadBookingMedia bookingId={booking._id} />
      )}

      {/* BOOKING INFO */}
      <div className="card bg-base-100 shadow">
        <div className="card-body space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {booking.serviceId?.title}
            </h2>
            <span className={`badge ${statusBadge(booking.status)}`}>
              {booking.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Schedule</p>
              <p>{formatDate(booking.schedule)}</p>
            </div>

            <div>
              <p className="font-medium">Address</p>
              <p>{booking.address}</p>
            </div>

            <div>
              <p className="font-medium">Provider</p>
              <p>{booking.providerId?.name || "Not assigned yet"}</p>
            </div>

            <div>
              <p className="font-medium">Contact</p>
              <p>{booking.providerId?.phone || "-"}</p>
            </div>
          </div>

          {/* PROBLEM DESCRIPTION */}
          {booking.problemDescription && (
            <div>
              <p className="font-medium mb-1">Problem Description</p>
              <p className="text-gray-600">{booking.problemDescription}</p>
            </div>
          )}
        </div>
      </div>

      {/* ================= INVOICE ================= */}
      {booking.status === "COMPLETED" && (
        <div className="card bg-base-100 shadow">
          <div className="card-body space-y-3">
            <h3 className="text-lg font-semibold">Invoice</h3>

            {/* GENERATE */}
            {!invoice && (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => dispatch(generateInvoice(booking._id))}
                disabled={invoiceLoading}
              >
                {invoiceLoading ? "Generating..." : "Generate Invoice"}
              </button>
            )}

            {/* DOWNLOAD */}
            {invoice && (
              <button
                className="btn btn-outline btn-sm"
                onClick={() => dispatch(downloadInvoice(invoice._id))}
              >
                Download Invoice (PDF)
              </button>
            )}
          </div>
        </div>
      )}

      {/* ================= CANCEL BOOKING ================= */}
      {!["WORK_STARTED", "COMPLETED", "CANCELLED"].includes(booking.status) && (
        <div className="card bg-base-100 shadow">
          <div className="card-body space-y-3">
            <h3 className="text-lg font-semibold text-error">Cancel Booking</h3>

            {!showCancel ? (
              <button
                className="btn btn-error btn-outline btn-sm"
                onClick={() => setShowCancel(true)}
              >
                Cancel Booking
              </button>
            ) : (
              <>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Reason for cancellation (optional)"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                />

                <div className="flex gap-2">
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => {
                      dispatch(
                        cancelBooking({
                          id: booking._id,
                          reason: cancelReason,
                        }),
                      );
                    }}
                  >
                    Confirm Cancel
                  </button>

                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setShowCancel(false)}
                  >
                    Back
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* MEDIA PREVIEW */}
      {booking.media?.length > 0 && (
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="font-semibold mb-3">Uploaded Media</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {booking.media.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="booking"
                  className="rounded-lg border object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetailPage;
