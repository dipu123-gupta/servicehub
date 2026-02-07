import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "./admin.api";

/* THUNKS */
export const fetchDashboard = createAsyncThunk("admin/dashboard", api.getDashboardStatsApi);
export const fetchUsers = createAsyncThunk("admin/users", api.getUsersApi);
export const fetchProviders = createAsyncThunk("admin/providers", api.getProvidersApi);
export const fetchWithdraws = createAsyncThunk("admin/withdraws", api.getWithdrawRequestsApi);

export const verifyProvider = createAsyncThunk(
  "admin/verifyProvider",
  async (id) => api.verifyProviderApi(id)
);

export const blockUser = createAsyncThunk(
  "admin/blockUser",
  async (id) => api.blockUserApi(id)
);

export const approveWithdraw = createAsyncThunk(
  "admin/approveWithdraw",
  async (id) => api.approveWithdrawApi(id)
);

export const rejectWithdraw = createAsyncThunk(
  "admin/rejectWithdraw",
  async (id) => api.rejectWithdrawApi(id)
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    stats: null,
    users: [],
    providers: [],
    withdraws: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (b) => {
    b.addMatcher(
      (a) => a.type.startsWith("admin/") && a.type.endsWith("/pending"),
      (s) => {
        s.loading = true;
      }
    );
    b.addMatcher(
      (a) => a.type.startsWith("admin/") && a.type.endsWith("/fulfilled"),
      (s) => {
        s.loading = false;
      }
    );
  },
});

export default adminSlice.reducer;
