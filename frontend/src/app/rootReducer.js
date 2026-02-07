import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import bookingReducer from "../features/bookings/booking.slice";
import providerJobsReducer from "../features/providerJobs/providerJobs.slice";
import adminReducer from "../features/admin/admin.slice";
import invoiceReducer from "../features/invoice/invoice.slice";
import walletReducer from "../features/wallet/wallet.slice";
import notificationReducer from "../features/notifications/notification.slice";
import adminWithdrawReducer from "../features/adminWithdraw/adminWithdraw.slice";

export default combineReducers({
  auth: authReducer,
  bookings: bookingReducer,
  providerJobs: providerJobsReducer,
  admin: adminReducer,
  invoice: invoiceReducer,
  wallet: walletReducer,
  notifications: notificationReducer,
  adminWithdraw: adminWithdrawReducer,
});
