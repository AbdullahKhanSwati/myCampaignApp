import VolunteerAssignment from "../Models/VolunteerAssignmentModel.js";
import CanvassingRoute from "../Models/CanvassingRouteModel.js";
import Campaign from "../Models/CampaignModel.js";
import mongoose from "mongoose";

// ✅ Assign routes to a volunteer
export const assignRoutesToVolunteer = async (volunteerEmail, routeIds, assignedBy, campaignId) => {
  try {
    if (!volunteerEmail || !Array.isArray(routeIds) || routeIds.length === 0) {
      return {
        success: false,
        message: "Volunteer email and at least one route ID are required",
      };
    }

    // Validate all route IDs belong to the campaign
    const routes = await CanvassingRoute.find({
      _id: { $in: routeIds },
      campaignId: campaignId,
    });

    if (routes.length !== routeIds.length) {
      return {
        success: false,
        message: "One or more routes not found or don't belong to this campaign",
      };
    }

    // Remove existing assignments for this volunteer in this campaign (optional - or keep both)
    // For now, we'll allow multiple assignments
    
    // Create new assignments
    const assignments = routeIds.map((routeId) => ({
      volunteerEmail: volunteerEmail.toLowerCase().trim(),
      routeId,
      campaignId,
      assignedBy,
      status: "Active",
    }));

    const createdAssignments = await VolunteerAssignment.insertMany(assignments);

    return {
      success: true,
      data: createdAssignments,
      message: `Successfully assigned ${createdAssignments.length} route(s) to ${volunteerEmail}`,
    };
  } catch (error) {
    console.error("Error in assignRoutesToVolunteer:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

// ✅ Get all routes assigned to a volunteer
export const getAssignedRoutesByEmail = async (volunteerEmail) => {
  try {
    const assignments = await VolunteerAssignment.find({
      volunteerEmail: volunteerEmail.toLowerCase().trim(),
      status: "Active",
    })
      .populate("routeId")
      .populate("campaignId", "type city electionDate")
      .populate("assignedBy", "name email")
      .lean();

    return {
      success: true,
      data: assignments,
      message: "Assigned routes retrieved successfully",
    };
  } catch (error) {
    console.error("Error in getAssignedRoutesByEmail:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

// ✅ Check if user is a volunteer (has route assignments but no campaign)
export const checkIfVolunteer = async (email, userId = null) => {
  try {
    // Check if email exists in VolunteerAssignment
    const assignmentCount = await VolunteerAssignment.countDocuments({
      volunteerEmail: email.toLowerCase().trim(),
      status: "Active",
    });

    // If user has assignments, check if they also have a campaign
    // A user is a "pure volunteer" only if they have assignments BUT no campaign
    let hasCampaign = false;
    if (userId && assignmentCount > 0) {
      const campaignCount = await Campaign.countDocuments({
        userId: mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : userId,
      });
      hasCampaign = campaignCount > 0;
    }

    // User is a volunteer if they have assignments AND no campaign
    const isVolunteer = assignmentCount > 0 && !hasCampaign;

    return {
      success: true,
      isVolunteer,
      assignmentCount,
      hasCampaign,
    };
  } catch (error) {
    console.error("Error in checkIfVolunteer:", error);
    return {
      success: false,
      isVolunteer: false,
      message: error.message,
    };
  }
};

// ✅ Get volunteers for a campaign (with their assigned routes)
// Filter by campaignId and optionally by assignedBy (user who assigned them)
export const getCampaignVolunteers = async (campaignId, assignedBy = null) => {
  try {
    const query = {
      campaignId,
      status: "Active",
    };
    
    // If assignedBy is provided, only show volunteers assigned by that user
    if (assignedBy) {
      query.assignedBy = assignedBy;
    }

    const assignments = await VolunteerAssignment.find(query)
      .populate("routeId", "routeName status priority")
      .populate("assignedBy", "name email")
      .lean();

    // Group by volunteer email
    const volunteerMap = {};
    assignments.forEach((assignment) => {
      const email = assignment.volunteerEmail;
      if (!volunteerMap[email]) {
        volunteerMap[email] = {
          email,
          routes: [],
          assignedBy: assignment.assignedBy,
        };
      }
      if (assignment.routeId) {
        volunteerMap[email].routes.push(assignment.routeId);
      }
    });

    const volunteers = Object.values(volunteerMap);

    return {
      success: true,
      data: volunteers,
      message: "Campaign volunteers retrieved successfully",
    };
  } catch (error) {
    console.error("Error in getCampaignVolunteers:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

// ✅ Remove route assignment from volunteer
export const removeRouteAssignment = async (assignmentId) => {
  try {
    const assignment = await VolunteerAssignment.findByIdAndUpdate(
      assignmentId,
      { status: "Inactive" },
      { new: true }
    );

    if (!assignment) {
      return {
        success: false,
        message: "Assignment not found",
      };
    }

    return {
      success: true,
      data: assignment,
      message: "Route assignment removed successfully",
    };
  } catch (error) {
    console.error("Error in removeRouteAssignment:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};


