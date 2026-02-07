import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  generateInvoiceApi,
  downloadInvoiceApi,
} from "./invoice.api";

/* GENERATE */
export const generateInvoice = createAsyncThunk(
  "invoice/generate",
  async (bookingId, { rejectWithValue }) => {
    try {
      return await generateInvoiceApi(bookingId);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* DOWNLOAD */
export const downloadInvoice = createAsyncThunk(
  "invoice/download",
  async (invoiceId, { rejectWithValue }) => {
    try {
      return await downloadInvoiceApi(invoiceId);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    current: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(generateInvoice.pending, (s) => {
      s.loading = true;
    })
      .addCase(generateInvoice.fulfilled, (s, a) => {
        s.loading = false;
        s.current = a.payload.invoice;
      })
      .addCase(generateInvoice.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export default invoiceSlice.reducer;
