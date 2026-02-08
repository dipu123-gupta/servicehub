import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getProviderProfileApi,
  updateProviderProfileApi,
  uploadProviderProfileImageApi,
  updateAvailabilityApi,
} from "./provider.api";

/* THUNKS */
export const fetchProviderProfile = createAsyncThunk(
  "provider/profile",
  async (_, { rejectWithValue }) => {
    try {
      return await getProviderProfileApi();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const updateProviderProfile = createAsyncThunk(
  "provider/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      return await updateProviderProfileApi(data);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const uploadProviderProfileImage = createAsyncThunk(
  "provider/uploadImage",
  async (file, { rejectWithValue }) => {
    try {
      return await uploadProviderProfileImageApi(file);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const toggleAvailability = createAsyncThunk(
  "provider/toggleAvailability",
  async (isAvailable, { rejectWithValue }) => {
    try {
      return await updateAvailabilityApi(isAvailable);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const providerSlice = createSlice({
  name: "provider",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchProviderProfile.pending, (s) => {
      s.loading = true;
    })
      .addCase(fetchProviderProfile.fulfilled, (s, a) => {
        s.loading = false;
        s.profile = a.payload.provider;
      })
      .addCase(fetchProviderProfile.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(updateProviderProfile.fulfilled, (s, a) => {
        s.profile = a.payload.provider;
      })

      .addCase(uploadProviderProfileImage.fulfilled, (s, a) => {
        s.profile.avatar = a.payload.avatar;
      })

      .addCase(toggleAvailability.fulfilled, (s, a) => {
        s.profile.isAvailable = a.payload.isAvailable;
      });
  },
});

export default providerSlice.reducer;
