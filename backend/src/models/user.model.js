import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email address"],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    phone: {
      type: String,
      required: true,
      match: [/^[6-9]\d{9}$/, "Invalid phone number"],
    },

    role: {
      type: String,
      enum: ["USER", "PROVIDER", "ADMIN"],
      default: "USER",
    },

    addresses: [
      {
        label: { type: String, enum: ["Home", "Office", "Other"] },
        addressLine: { type: String },
        city: String,
        state: String,
        pincode: {
          type: String,
          match: [/^\d{6}$/, "Invalid pincode"],
        },
      },
    ],

    isBlocked: {
      type: Boolean,
      default: false,
    },

    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  { timestamps: true }
);

/* PASSWORD HASH */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

/* PASSWORD COMPARE */
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
