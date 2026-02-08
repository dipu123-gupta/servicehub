import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  changePasswordApi,
  getUserProfileApi,
  updateUserProfileApi,
  uploadProfileImageApi,
} from "./user.api";

/* FETCH PROFILE */
export const fetchUserProfile = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      return await getUserProfileApi();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      return await updateUserProfileApi(data);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const uploadUserProfileImage = createAsyncThunk(
  "user/uploadImage",
  async (file, { rejectWithValue }) => {
    try {
      return await uploadProfileImageApi(file);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);


export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      return await changePasswordApi(data);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchUserProfile.pending, (s) => {
      s.loading = true;
    })
      .addCase(fetchUserProfile.fulfilled, (s, a) => {
        s.loading = false;
        s.profile = a.payload.user;
      })
      .addCase(fetchUserProfile.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(updateUserProfile.fulfilled, (s, a) => {
        s.profile = a.payload.user;
      })
      .addCase(uploadUserProfileImage.fulfilled, (s, a) => {
        s.profile.avatar = a.payload.avatar;
      })
      .addCase(changePassword.pending, (s) => {
        s.loading = true;
      })
      .addCase(changePassword.fulfilled, (s) => {
        s.loading = false;
      })
      .addCase(changePassword.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export default userSlice.reducer;
