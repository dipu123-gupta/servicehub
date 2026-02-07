import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getMyNotificationsApi,
  markAsReadApi,
} from "./notification.api";

/* THUNKS */
export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getMyNotificationsApi();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const markNotificationRead = createAsyncThunk(
  "notifications/read",
  async (id) => {
    await markAsReadApi(id);
    return id;
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchNotifications.pending, (s) => {
      s.loading = true;
    })
      .addCase(fetchNotifications.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload.notifications;
      })
      .addCase(fetchNotifications.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(markNotificationRead.fulfilled, (s, a) => {
        s.list = s.list.map((n) =>
          n._id === a.payload ? { ...n, isRead: true } : n
        );
      });
  },
});

export default notificationSlice.reducer;
