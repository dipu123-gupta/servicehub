import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getProviderJobsApi,
  acceptJobApi,
  verifyOtpApi,
  startWorkApi,
  completeJobApi,
  rejectJobApi,
  getJobHistoryApi,
} from "./providerJobs.api";

/* THUNKS */
export const fetchProviderJobs = createAsyncThunk(
  "providerJobs/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getProviderJobsApi();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

export const acceptJob = createAsyncThunk(
  "providerJobs/accept",
  async (id, { rejectWithValue }) => {
    try {
      return await acceptJobApi(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

export const verifyOtp = createAsyncThunk(
  "providerJobs/verifyOtp",
  async ({ id, otp }, { rejectWithValue }) => {
    try {
      return await verifyOtpApi({ id, otp });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

export const startWork = createAsyncThunk(
  "providerJobs/start",
  async (id, { rejectWithValue }) => {
    try {
      return await startWorkApi(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

export const completeJob = createAsyncThunk(
  "providerJobs/complete",
  async (id, { rejectWithValue }) => {
    try {
      return await completeJobApi(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

export const rejectJob = createAsyncThunk(
  "providerJobs/reject",
  async (id, { rejectWithValue }) => {
    try {
      return await rejectJobApi(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

export const fetchJobHistory = createAsyncThunk(
  "providerJobs/history",
  async (_, { rejectWithValue }) => {
    try {
      return await getProviderJobHistoryApi();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);


const slice = createSlice({
  name: "providerJobs",
  initialState: {
    list: [],
    history: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchProviderJobs.pending, (s) => {
      s.loading = true;
    })
      .addCase(fetchProviderJobs.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload.jobs;
      })
      .addCase(fetchProviderJobs.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(rejectJob.fulfilled, (s, a) => {
        s.list = s.list.filter((job) => job._id !== a.meta.arg);
      })
      .addCase(fetchJobHistory.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchJobHistory.fulfilled, (s, a) => {
        s.loading = false;
        s.history = a.payload.jobs;
      })
      .addCase(fetchJobHistory.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export default slice.reducer;
