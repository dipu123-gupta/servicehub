import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getWithdrawRequestsApi,
  approveWithdrawApi,
  rejectWithdrawApi,
} from "./adminWithdraw.api";

/* FETCH */
export const fetchWithdrawRequests = createAsyncThunk(
  "adminWithdraw/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getWithdrawRequestsApi();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* APPROVE */
export const approveWithdraw = createAsyncThunk(
  "adminWithdraw/approve",
  async (id, { rejectWithValue }) => {
    try {
      return await approveWithdrawApi(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* REJECT */
export const rejectWithdraw = createAsyncThunk(
  "adminWithdraw/reject",
  async (id, { rejectWithValue }) => {
    try {
      return await rejectWithdrawApi(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const slice = createSlice({
  name: "adminWithdraw",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchWithdrawRequests.pending, (s) => {
      s.loading = true;
    })
      .addCase(fetchWithdrawRequests.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload.withdraws;
      })
      .addCase(fetchWithdrawRequests.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(approveWithdraw.fulfilled, (s, a) => {
        s.list = s.list.filter((w) => w._id !== a.meta.arg);
      })
      .addCase(rejectWithdraw.fulfilled, (s, a) => {
        s.list = s.list.filter((w) => w._id !== a.meta.arg);
      });
  },
});

export default slice.reducer;
