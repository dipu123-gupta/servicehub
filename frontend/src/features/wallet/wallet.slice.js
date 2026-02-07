// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getWalletApi, withdrawRequestApi } from "./wallet.api";

// /* THUNKS */
// export const fetchWallet = createAsyncThunk(
//   "wallet/fetch",
//   async (_, { rejectWithValue }) => {
//     try {
//       return await getWalletApi();
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message);
//     }
//   }
// );

// export const withdrawAmount = createAsyncThunk(
//   "wallet/withdraw",
//   async (amount, { rejectWithValue }) => {
//     try {
//       return await withdrawRequestApi(amount);
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message);
//     }
//   }
// );

// const walletSlice = createSlice({
//   name: "wallet",
//   initialState: {
//     balance: 0,
//     commission: 0,
//     providerAmount: 0,
//     withdrawable: 0,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (b) => {
//     b.addCase(fetchWallet.pending, (s) => {
//       s.loading = true;
//     })
//       .addCase(fetchWallet.fulfilled, (s, a) => {
//         s.loading = false;
//         Object.assign(s, a.payload);
//       })
//       .addCase(fetchWallet.rejected, (s, a) => {
//         s.loading = false;
//         s.error = a.payload;
//       })
//       .addCase(withdrawAmount.pending, (s) => {
//         s.loading = true;
//       })
//       .addCase(withdrawAmount.fulfilled, (s) => {
//         s.loading = false;
//       })
//       .addCase(withdrawAmount.rejected, (s, a) => {
//         s.loading = false;
//         s.error = a.payload;
//       });
//   },
// });

// export default walletSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getWalletApi,
  withdrawRequestApi,
} from "./wallet.api";

/* FETCH WALLET */
export const fetchWallet = createAsyncThunk(
  "wallet/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getWalletApi();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* WITHDRAW */
export const withdrawRequest = createAsyncThunk(
  "wallet/withdraw",
  async (amount, { rejectWithValue }) => {
    try {
      return await withdrawRequestApi(amount);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
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
      .addCase(withdrawRequest.fulfilled, (s) => {
        s.success = "Withdraw request submitted for admin approval";
      });
  },
});

export const { clearWalletMsg } = walletSlice.actions;
export default walletSlice.reducer;
