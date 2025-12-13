import mongoose from "mongoose";

const canvassingRouteSchema = new mongoose.Schema(
  {
    routeName: {
      type: String,
      required: true,
      trim: true,
    },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "data", // user model
      required: true,
    },

    // 🗺️ Area boundary coordinates (Polygon)
    boundary: {
      type: {
        type: String,
        enum: ["Polygon"],
        default: "Polygon",
      },
      coordinates: {
        type: [[[Number]]], // Array of arrays of [lng, lat]
        required: true,
      },
    },

    // 📍 Voters included in this route
    voters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Voter",
      },
    ],

    // 🧮 Statistics
    totalVoters: {
      type: Number,
      default: 0,
    },
    completedVoters: {
      type: Number,
      default: 0,
    },
    progress: {
      type: Number,
      default: 0, // auto-calculated: (completed / total) * 100
    },

    // ⚙️ Route status
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
      default: "Not Started",
    },

    // 🚦 Priority
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

canvassingRouteSchema.index({ boundary: "2dsphere" });

export default mongoose.model("CanvassingRoute", canvassingRouteSchema);
