import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginApi,
  logoutApi,
  loadUserApi,
  registerUserApi,
  registerProviderApi,
} from "./auth.api";

/* REGISTER USER */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      return await registerUserApi(data);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

/* REGISTER PROVIDER */
export const registerProvider = createAsyncThunk(
  "auth/registerProvider",
  async (data, { rejectWithValue }) => {
    try {
      return await registerProviderApi(data);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

/* LOAD USER */
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      return await loadUserApi();
    } catch {
      return rejectWithValue();
    }
  },
);

/* LOGIN */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      return await loginApi(formData);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

/* LOGOUT */
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await logoutApi();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    role: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.role = action.payload.role;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.role = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.role = action.payload.role;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.role = null;
      })
      .addCase(registerUser.pending, (s) => {
        s.loading = true;
      })
      .addCase(registerUser.fulfilled, (s) => {
        s.loading = false;
      })
      .addCase(registerUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(registerProvider.pending, (s) => {
        s.loading = true;
      })
      .addCase(registerProvider.fulfilled, (s) => {
        s.loading = false;
      })
      .addCase(registerProvider.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export default authSlice.reducer;
