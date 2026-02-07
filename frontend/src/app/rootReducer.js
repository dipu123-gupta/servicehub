import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import bookingReducer from "../features/bookings/booking.slice";
import providerJobsReducer from "../features/providerJobs/providerJobs.slice";
import adminReducer from "../features/admin/admin.slice";
const rootReducer = combineReducers({
  auth: authReducer,
  bookings: bookingReducer,
  providerJobs: providerJobsReducer,
  admin: adminReducer
});
export default rootReducer;
