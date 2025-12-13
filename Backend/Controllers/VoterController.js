import {
  getVotersByCampaignId,
  getVoterStatsByCampaignId,
  updateVoterStatus,
  updateVoterCurrentNotes,
  updateVoterDetails
} from "../queries/voterQueries.js";
import mongoose from "mongoose";
// ✅ Get voters by campaign ID
export const getVotersByCampaignIdController = async (req, res) => {
  try {
    const { campaignId } = req.query;
    
    // Validate campaignId
    if (!campaignId) {
      return res.status(400).json({
        success: false,
        message: "Campaign ID is required in query parameters"
      });
    }

    // Validate ObjectId format
    
    if (!mongoose.Types.ObjectId.isValid(campaignId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Campaign ID format"
      });
    }

    // Extract query parameters for filtering and pagination
    const options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      status: req.query.status,
      search: req.query.search,
      sortBy: req.query.sortBy || "createdAt",
      sortOrder: req.query.sortOrder || "desc",
      routeId: req.query.routeId // Support filtering by route for volunteers
    };

    // Call the query function
    const result = await getVotersByCampaignId(campaignId, options);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.message
      });
    }

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data
    });

  } catch (error) {
    console.error("Error in getVotersByCampaignIdController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

// ✅ Get voter statistics by campaign ID (with optional routeId filter)
export const getVoterStatsByCampaignIdController = async (req, res) => {
  try {
    const { campaignId, routeId } = req.query;
    
    // Validate campaignId
    if (!campaignId) {
      return res.status(400).json({
        success: false,
        message: "Campaign ID is required in query parameters"
      });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(campaignId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Campaign ID format"
      });
    }

    // Validate routeId if provided
    if (routeId && !mongoose.Types.ObjectId.isValid(routeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Route ID format"
      });
    }

    // Call the query function with optional routeId
    const result = await getVoterStatsByCampaignId(campaignId, routeId || null);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.message
      });
    }

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data
    });

  } catch (error) {
    console.error("Error in getVoterStatsByCampaignIdController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

const ALLOWED_STATUSES = ["yes", "no", "moved", "undecided"];

// ✅ Update voter status
export const updateVoterStatusController = async (req, res) => {
  try {
    const { voterId } = req.params;
    const { status } = req.body;

    if (!voterId) {
      return res.status(400).json({
        success: false,
        message: "Voter ID is required in the request params"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(voterId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Voter ID format"
      });
    }

    if (!status || !ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${ALLOWED_STATUSES.join(", ")}`
      });
    }

    const result = await updateVoterStatus(voterId, status);

    if (!result.success) {
      const statusCode = result.message === "Voter not found" ? 404 : 500;
      return res.status(statusCode).json({
        success: false,
        message: result.message
      });
    }

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error("Error in updateVoterStatusController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

// ✅ Update voter current notes
export const updateVoterCurrentNotesController = async (req, res) => {
  try {
    const { voterId } = req.params;
    const { currentNotes } = req.body;

    if (!voterId) {
      return res.status(400).json({
        success: false,
        message: "Voter ID is required in the request params"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(voterId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Voter ID format"
      });
    }

    // currentNotes can be empty string, so we only check if it's not undefined
    if (currentNotes === undefined) {
      return res.status(400).json({
        success: false,
        message: "Current notes field is required"
      });
    }

    const result = await updateVoterCurrentNotes(voterId, currentNotes || "");

    if (!result.success) {
      const statusCode = result.message === "Voter not found" ? 404 : 500;
      return res.status(statusCode).json({
        success: false,
        message: result.message
      });
    }

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error("Error in updateVoterCurrentNotesController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

// ✅ Update voter details
export const updateVoterDetailsController = async (req, res) => {
  try {
    const { voterId } = req.params;
    const voterData = req.body;

    if (!voterId) {
      return res.status(400).json({
        success: false,
        message: "Voter ID is required in the request params"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(voterId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Voter ID format"
      });
    }

    if (!voterData || Object.keys(voterData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Voter data is required"
      });
    }

    const result = await updateVoterDetails(voterId, voterData);

    if (!result.success) {
      const statusCode = result.message === "Voter not found" ? 404 : 500;
      return res.status(statusCode).json({
        success: false,
        message: result.message
      });
    }

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error("Error in updateVoterDetailsController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};
