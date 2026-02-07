import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyBookingsApi } from "./booking.api";

/* FETCH USER BOOKINGS */
export const fetchMyBookings = createAsyncThunk(
  "bookings/fetchMy",
  async (_, { rejectWithValue }) => {
    try {
      return await getMyBookingsApi();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.bookings;
      })
      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
