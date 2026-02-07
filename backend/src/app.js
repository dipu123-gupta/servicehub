// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import morgan from "morgan";
// import helmet from "helmet";

// import errorMiddleware from "./middlewares/error.middleware.js";
// import authRouter from "./routers/auth.routes.js";
// import serviceRouter from "./routers/service.routers.js";
// import bookingRoutes from "./routers/booking.routes.js";
// import providerBookingRoutes from "./routers/providerBooking.routes.js";
// import paymentRoutes from "./routers/payment.routes.js";
// import reviewRoutes from "./routers/review.routes.js";
// import adminRoutes from "./routers/admin.routes.js";
// import walletRoutes from "./routers/wallet.routes.js";
// import invoiceRoutes from "./routers/invoice.routes.js"; // ✅ FIXED
// import userRoutes from "./routers/user.routes.js";
// import providerProfileRoutes from "./routers/provider.profile.routes.js";
// import adminFinanceRoutes from "./routers/admin.finance.routes.js";
// import notificationRoutes from "./routers/notification.routes.js";
// // import adminFinanceRoutes from "./routers/admin.finance.routes.js";
// // import bookingRoutes from "./routers/booking.routes.js";

// import adminWithdrawRoutes from "./routers/admin.withdraw.routes.js";
// // import cors from "cors";


// const app = express();

// /* ===== SECURITY ===== */
// app.use(helmet());
// app.disable("x-powered-by");

// /* ===== BODY PARSER ===== */
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// /* ===== CORS ===== */
// // import cors from "cors";

// app.use(
//   cors({
//     origin: "http://localhost:5173", // frontend url
//     credentials: true,               // 🔥 VERY IMPORTANT
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );


// app.use(morgan("dev"));

// /* ===== ROUTES ===== */
// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/services", serviceRouter);
// app.use("/api/v1/bookings", bookingRoutes);
// app.use("/api/v1/provider", providerBookingRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/admin", adminRoutes);
// app.use("/api/v1/reviews", reviewRoutes);
// app.use("/api/v1/invoices", invoiceRoutes);
// app.use("/api/v1/wallet", walletRoutes);
// app.use("/api/v1/users", userRoutes);
// // app.use("/api/v1/provider", providerProfileRoutes);
// app.use("/api/v1/admin", adminFinanceRoutes);
// app.use("/api/v1/notifications", notificationRoutes);
// // app.use("/api/v1/provider/bookings", providerBookingRoutes);
// app.use("/api/v1/provider/profile", providerProfileRoutes);
// app.use("/api/v1/admin", adminWithdrawRoutes);


// app.use("/api/v1/bookings", bookingRoutes);



// /* ===== TEST ===== */
// app.get("/", (req, res) => {
//   res.send("API is running 🚀");
// });

// /* ===== ERROR ===== */
// app.use(errorMiddleware);

// export default app;


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

import errorMiddleware from "./middlewares/error.middleware.js";

/* ROUTES */
import authRouter from "./routers/auth.routes.js";
import serviceRouter from "./routers/service.routers.js";
import bookingRoutes from "./routers/booking.routes.js";
import providerBookingRoutes from "./routers/providerBooking.routes.js";
import providerProfileRoutes from "./routers/provider.profile.routes.js";
import paymentRoutes from "./routers/payment.routes.js";
import reviewRoutes from "./routers/review.routes.js";
import adminRoutes from "./routers/admin.routes.js";
import adminFinanceRoutes from "./routers/admin.finance.routes.js";
import adminWithdrawRoutes from "./routers/admin.withdraw.routes.js";
import walletRoutes from "./routers/wallet.routes.js";
import invoiceRoutes from "./routers/invoice.routes.js";
import userRoutes from "./routers/user.routes.js";
import notificationRoutes from "./routers/notification.routes.js";

const app = express();

/* ===== SECURITY ===== */
app.use(helmet());
app.disable("x-powered-by");

/* ===== BODY PARSER ===== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ===== CORS ===== */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev"));

/* ===== ROUTES ===== */

// AUTH
app.use("/api/v1/auth", authRouter);

// SERVICES
app.use("/api/v1/services", serviceRouter);

// BOOKINGS (USER)
app.use("/api/v1/bookings", bookingRoutes);

// PROVIDER
app.use("/api/v1/provider/bookings", providerBookingRoutes);
app.use("/api/v1/provider/profile", providerProfileRoutes);

// PAYMENTS
app.use("/api/v1/payment", paymentRoutes);

// REVIEWS
app.use("/api/v1/reviews", reviewRoutes);

// USER PROFILE
app.use("/api/v1/users", userRoutes);

// WALLET
app.use("/api/v1/wallet", walletRoutes);

// INVOICES
app.use("/api/v1/invoices", invoiceRoutes);

// NOTIFICATIONS
app.use("/api/v1/notifications", notificationRoutes);

// ADMIN (MERGED CLEANLY)
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/admin", adminFinanceRoutes);
app.use("/api/v1/admin", adminWithdrawRoutes);

/* ===== TEST ===== */
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

/* ===== ERROR HANDLER ===== */
app.use(errorMiddleware);

export default app;
