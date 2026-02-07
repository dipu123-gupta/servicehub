import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getMyBookingsApi,
  getBookingByIdApi,
  cancelBookingApi,
  uploadBookingMediaApi,
} from "./booking.api";

/* FETCH USER BOOKINGS */
export const fetchMyBookings = createAsyncThunk(
  "bookings/fetchMy",
  async (_, { rejectWithValue }) => {
    try {
      return await getMyBookingsApi();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

/* FETCH BOOKING DETAIL */
export const fetchBookingById = createAsyncThunk(
  "bookings/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      return await getBookingByIdApi(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

/* CANCEL BOOKING */
export const cancelBooking = createAsyncThunk(
  "bookings/cancel",
  async ({ id, reason }, { rejectWithValue }) => {
    try {
      return await cancelBookingApi({ id, reason });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

/* UPLOAD MEDIA */
export const uploadBookingMedia = createAsyncThunk(
  "bookings/uploadMedia",
  async ({ id, file }, { rejectWithValue }) => {
    try {
      return await uploadBookingMediaApi({ id, file });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    list: [],
    booking: null,
    loading: false,
    uploadLoading: false,
    error: null,
  },
  reducers: {
    clearSelectedBooking: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* LIST */
      .addCase(fetchMyBookings.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchMyBookings.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload.bookings;
      })
      .addCase(fetchMyBookings.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      /* DETAIL */
      .addCase(fetchBookingById.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchBookingById.fulfilled, (s, a) => {
        s.loading = false;
        s.selected = a.payload.booking;
      })
      .addCase(fetchBookingById.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      /* CANCEL */
      .addCase(cancelBooking.fulfilled, (s, a) => {
        s.list = s.list.map((b) =>
          b._id === a.meta.arg.id ? { ...b, status: "CANCELLED" } : b,
        );
      })

      /* UPLOAD MEDIA */
      .addCase(uploadBookingMedia.pending, (s) => {
        s.uploadLoading = true;
      })
      .addCase(uploadBookingMedia.fulfilled, (s, a) => {
        s.uploadLoading = false;
        if (s.selected) {
          s.selected.media = a.payload.media;
        }
      })
      .addCase(uploadBookingMedia.rejected, (s, a) => {
        s.uploadLoading = false;
        s.error = a.payload;
      });
  },
});

export const { clearSelectedBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
