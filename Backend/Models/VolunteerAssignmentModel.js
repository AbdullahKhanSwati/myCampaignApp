import mongoose from "mongoose";

const volunteerAssignmentSchema = new mongoose.Schema(
  {
    // Email of the volunteer
    volunteerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    
    // Route assigned to this volunteer
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CanvassingRoute",
      required: true,
    },
    
    // Campaign this route belongs to
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    
    // User who assigned this route (campaign owner)
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "data", // User model
      required: true,
    },
    
    // Status of the assignment
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

// Index for efficient queries
volunteerAssignmentSchema.index({ volunteerEmail: 1, routeId: 1 });
volunteerAssignmentSchema.index({ volunteerEmail: 1, status: 1 });

export default mongoose.model("VolunteerAssignment", volunteerAssignmentSchema);


