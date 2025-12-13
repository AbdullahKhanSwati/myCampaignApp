import mongoose from "mongoose";

const voterSchema = new mongoose.Schema(
  {
    lastName: { type: String, trim: true },
    firstName: { type: String, trim: true },
    streetNo: { type: String, trim: true },
    streetName: { type: String, trim: true },
    aptUnit: { type: String, trim: true },
    residenceCity: { type: String, trim: true },
    residenceState: { type: String, trim: true },
    residenceZip: { type: String, trim: true },
    municipality: { type: String, trim: true },
    ward: { type: String, trim: true },
    district: { type: String, trim: true },
    party: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true },
    notes: { type: String, trim: true },
    currentNotes: { type: String, trim: true, default: "" },
    
    // Default voter status
    status: { 
      type: String, 
      enum: ["yes", "no", "moved", "undecided"], 
      default: "undecided" 
    },

    // Geospatial point for mapping (longitude, latitude)
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
      }
    },

    // Relation to campaign
    campaignId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Campaign", 
      required: true 
    },
  },
  { timestamps: true }
);

voterSchema.index({ location: "2dsphere" });

export default mongoose.model("Voter", voterSchema);
