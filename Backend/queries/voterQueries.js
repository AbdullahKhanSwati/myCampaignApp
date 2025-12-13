import VoterModel from "../Models/VoterModel.js";
import CanvassingRoute from "../Models/CanvassingRouteModel.js";
import mongoose from "mongoose";

// ✅ Get voters by campaign ID
export const getVotersByCampaignId = async (campaignId, options = {}) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
      routeId // New parameter for filtering by route
    } = options;

    // Build query filter
    const filter = { campaignId };

    // If routeId is provided, we need to filter voters by route
    // First, get the route to find which voters are in it
    if (routeId) {
      const route = await CanvassingRoute.findById(routeId).lean();
      if (route && route.voters && route.voters.length > 0) {
        filter._id = { $in: route.voters };
      } else {
        // Route has no voters, return empty result
        return {
          success: true,
          data: {
            voters: [],
            pagination: {
              currentPage: parseInt(page),
              totalPages: 0,
              totalCount: 0,
              hasNextPage: false,
              hasPrevPage: false
            }
          },
          message: "No voters found in the selected route"
        };
      }
    }

    // Add status filter if provided
    if (status) {
      filter.status = status;
    }

    // Add search filter if provided
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { residenceCity: { $regex: search, $options: "i" } },
        { municipality: { $regex: search, $options: "i" } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Execute query with pagination
    const voters = await VoterModel.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('campaignId', 'name description')
      .lean();

    // Get total count for pagination
    const totalCount = await VoterModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    return {
      success: true,
      data: {
        voters,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCount,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      },
      message: "Voters retrieved successfully"
    };
  } catch (error) {
    console.error("Error in getVotersByCampaignId:", error);
    return {
      success: false,
      data: null,
      message: error.message
    };
  }
};

// ✅ Get voter statistics by campaign ID (with optional routeId filter)
export const getVoterStatsByCampaignId = async (campaignId, routeId = null) => {
  try {
    // Build match filter
    const matchFilter = { campaignId: new mongoose.Types.ObjectId(campaignId) };

    // If routeId is provided, filter voters by route
    if (routeId) {
      const route = await CanvassingRoute.findById(routeId).lean();
      if (route && route.voters && route.voters.length > 0) {
        matchFilter._id = { $in: route.voters };
      } else {
        // Route has no voters, return empty stats
        return {
          success: true,
          data: {
            yes: 0,
            no: 0,
            moved: 0,
            undecided: 0,
            total: 0
          },
          message: "Voter statistics retrieved successfully"
        };
      }
    }

    const stats = await VoterModel.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Transform stats into a more readable format
    const statusCounts = {
      yes: 0,
      no: 0,
      moved: 0,
      undecided: 0,
      total: 0
    };

    stats.forEach(stat => {
      if (stat._id) {
        statusCounts[stat._id] = stat.count;
      }
      statusCounts.total += stat.count;
    });

    return {
      success: true,
      data: statusCounts,
      message: "Voter statistics retrieved successfully"
    };
  } catch (error) {
    console.error("Error in getVoterStatsByCampaignId:", error);
    return {
      success: false,
      data: null,
      message: error.message
    };
  }
};

// ✅ Create new voter
export const createVoter = async (voterData) => {
  try {
    const voter = new VoterModel(voterData);
    const savedVoter = await voter.save();
    return {
      success: true,
      data: savedVoter,
      message: "Voter created successfully"
    };
  } catch (error) {
    console.error("Error in createVoter:", error);
    return {
      success: false,
      data: null,
      message: error.message
    };
  }
};

// ✅ Update voter status
export const updateVoterStatus = async (voterId, status) => {
  try {
    const voter = await VoterModel.findByIdAndUpdate(
      voterId,
      { status },
      { new: true }
    );

    if (!voter) {
      return {
        success: false,
        data: null,
        message: "Voter not found"
      };
    }

    return {
      success: true,
      data: voter,
      message: "Voter status updated successfully"
    };
  } catch (error) {
    console.error("Error in updateVoterStatus:", error);
    return {
      success: false,
      data: null,
      message: error.message
    };
  }
};

// ✅ Update voter current notes
export const updateVoterCurrentNotes = async (voterId, currentNotes) => {
  try {
    const voter = await VoterModel.findByIdAndUpdate(
      voterId,
      { currentNotes },
      { new: true }
    );

    if (!voter) {
      return {
        success: false,
        data: null,
        message: "Voter not found"
      };
    }

    return {
      success: true,
      data: voter,
      message: "Voter notes updated successfully"
    };
  } catch (error) {
    console.error("Error in updateVoterCurrentNotes:", error);
    return {
      success: false,
      data: null,
      message: error.message
    };
  }
};

// ✅ Update voter details
export const updateVoterDetails = async (voterId, voterData) => {
  try {
    // Remove fields that shouldn't be updated directly
    const { campaignId, location, _id, ...updateData } = voterData;
    
    const voter = await VoterModel.findByIdAndUpdate(
      voterId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!voter) {
      return {
        success: false,
        data: null,
        message: "Voter not found"
      };
    }

    return {
      success: true,
      data: voter,
      message: "Voter details updated successfully"
    };
  } catch (error) {
    console.error("Error in updateVoterDetails:", error);
    return {
      success: false,
      data: null,
      message: error.message
    };
  }
};