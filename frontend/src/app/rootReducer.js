import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import bookingReducer from "../features/bookings/booking.slice";
import providerJobsReducer from "../features/providerJobs/providerJobs.slice";
import adminReducer from "../features/admin/admin.slice";
import invoiceReducer from "../features/invoice/invoice.slice";
import notificationReducer from "../features/notifications/notification.slice";
import adminWithdrawReducer from "../features/adminWithdraw/adminWithdraw.slice";
import userReducer from "../features/user/user.slice";
import providerReducer from "../features/provider/provider.slice";
// import providerWalletReducer from "../features/providerWallet/providerWallet.slice";
import providerWalletReducer from "../features/wallet/providerWallet.slice";

export default combineReducers({
  auth: authReducer,
  bookings: bookingReducer,
  providerJobs: providerJobsReducer,
  admin: adminReducer,
  invoice: invoiceReducer,
  providerWallet: providerWalletReducer,
  notifications: notificationReducer,
  adminWithdraw: adminWithdrawReducer,
  user: userReducer,
  provider: providerReducer,
});
