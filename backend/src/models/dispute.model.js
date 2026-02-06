const disputeSchema = new mongoose.Schema({
  bookingId: mongoose.Schema.Types.ObjectId,
  raisedBy: String,
  reason: String,
  status: {
    type: String,
    enum: ["OPEN", "RESOLVED"],
    default: "OPEN",
  },
});
