import Mongoose from "mongoose";

const CampaignSchema = new Mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  electionDate: {
    type: Date,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  csvFile: {
    type: String, // Path to the uploaded CSV file
    required: true,
  },
  userId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "data", // Assuming you have a User model or similar
    required: true,
  },
},
{ timestamps: true });

export default Mongoose.model("Campaign", CampaignSchema);


