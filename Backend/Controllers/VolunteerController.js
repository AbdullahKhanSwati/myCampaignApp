import {
  assignRoutesToVolunteer,
  getAssignedRoutesByEmail,
  checkIfVolunteer,
  getCampaignVolunteers,
  removeRouteAssignment,
} from "../queries/volunteerQueries.js";
import mongoose from "mongoose";

// ✅ Assign routes to volunteer
export const assignRoutesToVolunteerController = async (req, res) => {
  try {
    const { volunteerEmail, routeIds, campaignId } = req.body;
    const assignedBy = req.user?._id || req.body.assignedBy; // Get from auth or body

    if (!volunteerEmail) {
      return res.status(400).json({
        success: false,
        message: "Volunteer email is required",
      });
    }

    if (!Array.isArray(routeIds) || routeIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one route ID is required",
      });
    }

    if (!campaignId) {
      return res.status(400).json({
        success: false,
        message: "Campaign ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(campaignId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Campaign ID format",
      });
    }

    // Validate route IDs
    const invalidRouteIds = routeIds.filter(
      (id) => !mongoose.Types.ObjectId.isValid(id)
    );
    if (invalidRouteIds.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid route ID format(s)",
      });
    }

    const result = await assignRoutesToVolunteer(
      volunteerEmail,
      routeIds,
      assignedBy,
      campaignId
    );

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Error in assignRoutesToVolunteerController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ✅ Get routes assigned to volunteer
export const getAssignedRoutesController = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const result = await getAssignedRoutesByEmail(email);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Error in getAssignedRoutesController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ✅ Check if user is volunteer
export const checkIfVolunteerController = async (req, res) => {
  try {
    const { email, userId } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Pass userId if provided to check for campaigns
    const result = await checkIfVolunteer(email, userId || null);

    return res.status(200).json({
      success: true,
      isVolunteer: result.isVolunteer,
      assignmentCount: result.assignmentCount || 0,
      hasCampaign: result.hasCampaign || false,
    });
  } catch (error) {
    console.error("Error in checkIfVolunteerController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ✅ Get campaign volunteers
export const getCampaignVolunteersController = async (req, res) => {
  try {
    const { campaignId, userId } = req.query;

    if (!campaignId) {
      return res.status(400).json({
        success: false,
        message: "Campaign ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(campaignId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Campaign ID format",
      });
    }

    // Validate userId if provided
    let assignedBy = null;
    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid User ID format",
        });
      }
      assignedBy = userId;
    }

    // Filter volunteers by campaign and optionally by user who assigned them
    const result = await getCampaignVolunteers(campaignId, assignedBy);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Error in getCampaignVolunteersController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ✅ Remove route assignment
export const removeRouteAssignmentController = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    if (!assignmentId) {
      return res.status(400).json({
        success: false,
        message: "Assignment ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Assignment ID format",
      });
    }

    const result = await removeRouteAssignment(assignmentId);

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Error in removeRouteAssignmentController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};


