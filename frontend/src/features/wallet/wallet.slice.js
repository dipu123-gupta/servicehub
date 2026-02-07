import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWalletApi, withdrawRequestApi } from "./wallet.api";

/* FETCH WALLET */
export const fetchWallet = createAsyncThunk(
  "wallet/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getWalletApi();
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* WITHDRAW */
export const withdrawAmount = createAsyncThunk(
  "wallet/withdraw",
  async (amount, { rejectWithValue }) => {
    try {
      return await withdrawRequestApi(amount);
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    wallet: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearWalletMsg: (s) => {
      s.error = null;
      s.success = null;
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
        s.success = "Withdraw request sent for admin approval";
      });
  },
});

export const { clearWalletMsg } = walletSlice.actions;
export default walletSlice.reducer;
