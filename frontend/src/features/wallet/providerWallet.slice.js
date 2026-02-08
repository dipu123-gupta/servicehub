import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getWalletApi,
  withdrawRequestApi,
} from "./providerWallet.api";

/* THUNKS */
export const fetchWallet = createAsyncThunk(
  "providerWallet/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getWalletApi();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const withdrawAmount = createAsyncThunk(
  "providerWallet/withdraw",
  async (amount, { rejectWithValue }) => {
    try {
      return await withdrawRequestApi(amount);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const providerWalletSlice = createSlice({
  name: "providerWallet",
  initialState: {
    wallet: null,
    loading: false,
    error: null,
    successMsg: null,
  },
  reducers: {
    clearWalletMsg: (s) => {
      s.successMsg = null;
      s.error = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchWallet.pending, (s) => {
      s.loading = true;
    })
      .addCase(fetchWallet.fulfilled, (s, a) => {
        s.loading = false;
        s.wallet = a.payload.wallet;
      })
      .addCase(fetchWallet.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(withdrawAmount.fulfilled, (s) => {
        s.successMsg =
          "Withdraw request submitted for admin approval";
      });
  },
});

export const { clearWalletMsg } =
  providerWalletSlice.actions;
export default providerWalletSlice.reducer;
