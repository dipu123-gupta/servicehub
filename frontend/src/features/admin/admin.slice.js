import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "./admin.api";
import {
  getPaymentsApi,
  getRevenueApi,
  getCommissionApi,
  getTransactionsApi,
} from "./admin.api";


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

export const fetchPayments = createAsyncThunk(
  "admin/payments",
  getPaymentsApi
);

export const fetchRevenue = createAsyncThunk(
  "admin/revenue",
  getRevenueApi
);

export const fetchCommission = createAsyncThunk(
  "admin/commission",
  getCommissionApi
);

export const fetchTransactions = createAsyncThunk(
  "admin/transactions",
  getTransactionsApi
);


/* ================= SLICE ================= */

const adminSlice = createSlice({
  name: "admin",
  initialState: {
  stats: null,
  users: [],
  providers: [],
  payments: [],      // ✅ ADD
  revenue: null,     // ✅ ADD
  commission: null,  // ✅ ADD
  transactions: [],  // ✅ ADD
  withdraws: [],
  loading: false,
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
