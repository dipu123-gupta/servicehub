import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const providerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email"],
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
      enum: ["PROVIDER"],
      default: "PROVIDER",
    },

    profileImage: String,

    skills: {
      type: [String],
      required: true,
    },

    experience: {
      type: Number,
      min: 0,
      default: 0,
    },

    documents: {
      idProof: String,
      certificate: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isOnline: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    totalJobs: {
      type: Number,
      default: 0,
    },

    cancelRate: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: (v) => v.length === 2,
          message: "Coordinates must be [lng, lat]",
        },
      },
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    ratingCount: {
      type: Number,
      default: 0,
    },
    jobRejectCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

providerSchema.index({ location: "2dsphere" });

providerSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

providerSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("Provider", providerSchema);
