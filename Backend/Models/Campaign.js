import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true
  },
  electionDate: {
    type: Date,
    required: true,
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  csvFile: {
    type: String, // path to uploaded CSV file
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "data", // references your User model
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Campaign", campaignSchema);
