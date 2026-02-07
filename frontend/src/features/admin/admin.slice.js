import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "./admin.api";

/* ================= THUNKS ================= */

// Dashboard
export const fetchDashboard = createAsyncThunk(
  "admin/dashboard",
  async () => api.getDashboardStatsApi()
);

// Users
export const fetchUsers = createAsyncThunk(
  "admin/users",
  async () => api.getUsersApi()
);

export const blockUser = createAsyncThunk(
  "admin/blockUser",
  async (id) => api.blockUserApi(id)
);

// Providers
export const fetchProviders = createAsyncThunk(
  "admin/providers",
  async () => api.getProvidersApi()
);

export const verifyProvider = createAsyncThunk(
  "admin/verifyProvider",
  async (id) => api.verifyProviderApi(id)
);

// Withdraws
export const fetchWithdraws = createAsyncThunk(
  "admin/withdraws",
  async () => api.getWithdrawRequestsApi()
);

export const approveWithdraw = createAsyncThunk(
  "admin/approveWithdraw",
  async (id) => api.approveWithdrawApi(id)
);

export const rejectWithdraw = createAsyncThunk(
  "admin/rejectWithdraw",
  async (id) => api.rejectWithdrawApi(id)
);

/* ================= SLICE ================= */

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    stats: null,
    users: [],
    providers: [],
    withdraws: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ================= DASHBOARD ================= */
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.stats = action.payload;
      })

      /* ================= USERS ================= */
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.users = state.users.map((u) =>
          u._id === action.payload.user._id
            ? action.payload.user
            : u
        );
      })

      /* ================= PROVIDERS ================= */
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.providers = action.payload.providers;
      })
      .addCase(verifyProvider.fulfilled, (state, action) => {
        state.providers = state.providers.map((p) =>
          p._id === action.payload.provider._id
            ? action.payload.provider
            : p
        );
      })

      /* ================= WITHDRAWS ================= */
      .addCase(fetchWithdraws.fulfilled, (state, action) => {
        state.withdraws = action.payload.withdraws;
      })
      .addCase(approveWithdraw.fulfilled, (state, action) => {
        state.withdraws = state.withdraws.filter(
          (w) => w._id !== action.payload.withdraw._id
        );
      })
      .addCase(rejectWithdraw.fulfilled, (state, action) => {
        state.withdraws = state.withdraws.filter(
          (w) => w._id !== action.payload.withdraw._id
        );
      })

      /* ================= GLOBAL LOADING ================= */
      .addMatcher(
        (action) =>
          action.type.startsWith("admin/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("admin/") &&
          action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("admin/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error?.message|| "Admin action failed";
        }
      );
  },
});

export default adminSlice.reducer;
