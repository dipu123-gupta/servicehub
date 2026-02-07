import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi, logoutApi, loadUserApi } from "./auth.api";

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

const initialState = {
  role: null,
  isAuthenticated: false,
  loading: true, // 🔥 important
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* LOAD USER */
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

      /* LOGIN */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* LOGOUT */
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.role = null;
      });
  },
});

export default authSlice.reducer;
