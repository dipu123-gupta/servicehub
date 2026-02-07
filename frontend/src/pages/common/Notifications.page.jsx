import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  markNotificationRead,
} from "../../features/notifications/notification.slice";

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notifications</h1>

      {loading && (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {!loading && list.length === 0 && (
        <p className="text-center text-gray-500">
          No notifications
        </p>
      )}

      {!loading &&
        list.map((n) => (
          <div
            key={n._id}
            className={`card shadow ${
              n.isRead ? "bg-base-100" : "bg-yellow-50"
            }`}
          >
            <div className="card-body">
              <h2 className="font-semibold">{n.title}</h2>
              <p className="text-sm text-gray-600">{n.message}</p>

              {!n.isRead && (
                <button
                  className="btn btn-xs btn-outline mt-2"
                  onClick={() =>
                    dispatch(markNotificationRead(n._id))
                  }
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default NotificationsPage;
