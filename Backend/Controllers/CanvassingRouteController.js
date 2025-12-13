import mongoose from "mongoose";
import CanvassingRoute from "../Models/CanvassingRouteModel.js";
import Voter from "../Models/VoterModel.js";
import { updateVoterStatus } from "../queries/voterQueries.js";

const ensurePolygonClosed = (coordinates = []) => {
  if (!Array.isArray(coordinates) || coordinates.length === 0) {
    return coordinates;
  }

  const first = coordinates[0];
  const last = coordinates[coordinates.length - 1];

  if (!first || !last) {
    return coordinates;
  }

  if (first[0] !== last[0] || first[1] !== last[1]) {
    return [...coordinates, first];
  }

  return coordinates;
};

const buildPolygonGeometry = (boundary = {}) => {
  if (!boundary.coordinates) {
    throw new Error("Boundary coordinates are required");
  }

  const rings = boundary.coordinates.map((ring) => ensurePolygonClosed(ring));
  return {
    type: "Polygon",
    coordinates: rings,
  };
};

const findVotersWithinBoundary = async (campaignId, boundaryGeometry) => {
  if (!boundaryGeometry || !boundaryGeometry.coordinates || boundaryGeometry.coordinates.length === 0) {
    return [];
  }

  const query = {
    campaignId: new mongoose.Types.ObjectId(campaignId),
    location: {
      $geoWithin: {
        $geometry: boundaryGeometry,
      },
    },
  };

  return Voter.find(query).lean();
};

const recalculateRouteProgress = async (routeId) => {
  const route = await CanvassingRoute.findById(routeId);
  if (!route) {
    return null;
  }

  const completedStatuses = ["yes", "no", "moved"];

  const completedCount = await Voter.countDocuments({
    _id: { $in: route.voters },
    status: { $in: completedStatuses },
  });

  route.completedVoters = completedCount;
  route.totalVoters = route.voters.length;
  route.progress = route.totalVoters === 0 ? 0 : Math.round((completedCount / route.totalVoters) * 100);

  await route.save();
  return route;
};

export const previewCanvassingRoute = async (req, res) => {
  try {
    const { campaignId, boundary } = req.body;

    if (!campaignId) {
      return res.status(400).json({
        success: false,
        message: "Campaign ID is required",
      });
    }

    if (!boundary || !Array.isArray(boundary.coordinates)) {
      return res.status(400).json({
        success: false,
        message: "Boundary coordinates are required",
      });
    }

    const geometry = buildPolygonGeometry(boundary);
    const voters = await findVotersWithinBoundary(campaignId, geometry);

    return res.status(200).json({
      success: true,
      message: "Voters within boundary fetched successfully",
      data: {
        voters,
        total: voters.length,
        boundary: geometry,
      },
    });
  } catch (error) {
    console.error("previewCanvassingRoute error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to preview canvassing route",
      error: error.message,
    });
  }
};

export const createCanvassingRoute = async (req, res) => {
  try {
    const {
      routeName,
      campaignId,
      createdBy,
      priority = "Medium",
      notes,
      boundary,
    } = req.body;
     
    if (!routeName || !campaignId || !createdBy) {
      return res.status(400).json({
        success: false,
        message: "routeName, campaignId, and createdBy are required",
      });
    }

    if (!boundary || !Array.isArray(boundary.coordinates) || boundary.coordinates.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Boundary coordinates are required",
      });
    }

    const geometry = buildPolygonGeometry(boundary);
    const voters = await findVotersWithinBoundary(campaignId, geometry);
    const voterIds = voters.map((voter) => voter._id);

    const canvassingRoute = await CanvassingRoute.create({
      routeName,
      campaignId,
      createdBy,
      boundary: geometry,
      voters: voterIds,
      totalVoters: voterIds.length,
      completedVoters: 0,
      progress: 0,
      priority,
      notes,
    });

    return res.status(201).json({
      success: true,
      message: "Canvassing route created successfully",
      data: {
        route: canvassingRoute,
        voters,
      },
    });
  } catch (error) {
    console.error("createCanvassingRoute error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create canvassing route",
      error: error.message,
    });
  }
};

export const getRoutesByCampaign = async (req, res) => {
  try {
    const { campaignId, routeId } = req.query;

    if (!campaignId) {
      return res.status(400).json({
        success: false,
        message: "Campaign ID is required",
      });
    }

    // If routeId is provided, return only that specific route (for volunteers)
    if (routeId) {
      if (!mongoose.Types.ObjectId.isValid(routeId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid route ID format",
        });
      }

      const route = await CanvassingRoute.findOne({ 
        _id: routeId, 
        campaignId 
      })
        .sort({ createdAt: -1 })
        .lean();

      if (!route) {
        return res.status(404).json({
          success: false,
          message: "Route not found or not part of this campaign",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Route fetched successfully",
        data: [route], // Return as array for consistency
      });
    }

    // Otherwise, return all routes for the campaign
    const routes = await CanvassingRoute.find({ campaignId })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: "Routes fetched successfully",
      data: routes,
    });
  } catch (error) {
    console.error("getRoutesByCampaign error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch routes",
      error: error.message,
    });
  }
};

export const getRouteById = async (req, res) => {
  try {
    const { routeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(routeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid route ID",
      });
    }

    const route = await CanvassingRoute.findById(routeId)
      .populate("voters")
      .lean();

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Route fetched successfully",
      data: route,
    });
  } catch (error) {
    console.error("getRouteById error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch route",
      error: error.message,
    });
  }
};

export const updateRouteStatus = async (req, res) => {
  try {
    const { routeId } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Not Started", "In Progress", "Completed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${allowedStatuses.join(", ")}`,
      });
    }

    const route = await CanvassingRoute.findByIdAndUpdate(
      routeId,
      { status },
      { new: true }
    );

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Route status updated successfully",
      data: route,
    });
  } catch (error) {
    console.error("updateRouteStatus error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update route status",
      error: error.message,
    });
  }
};

export const updateRouteVoterStatus = async (req, res) => {
  try {
    const { routeId, voterId } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(routeId) || !mongoose.Types.ObjectId.isValid(voterId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid route ID or voter ID",
      });
    }

    const allowedStatuses = ["yes", "no", "moved", "undecided"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${allowedStatuses.join(", ")}`,
      });
    }

    const route = await CanvassingRoute.findById(routeId);
    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    if (!route.voters.some((id) => id.toString() === voterId)) {
      return res.status(400).json({
        success: false,
        message: "Voter is not part of this route",
      });
    }

    const updateResult = await updateVoterStatus(voterId, status);

    if (!updateResult.success) {
      return res.status(500).json({
        success: false,
        message: updateResult.message,
      });
    }

    const updatedRoute = await recalculateRouteProgress(routeId);

    return res.status(200).json({
      success: true,
      message: "Voter status updated successfully",
      data: {
        voter: updateResult.data,
        route: updatedRoute,
      },
    });
  } catch (error) {
    console.error("updateRouteVoterStatus error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update voter status for route",
      error: error.message,
    });
  }
};

export const getCanvassingStats = async (req, res) => {
  try {
    const { campaignId, routeId } = req.query;

    if (!campaignId) {
      return res.status(400).json({
        success: false,
        message: "Campaign ID is required",
      });
    }

    let routes;

    // If routeId is provided, get stats for that specific route only
    if (routeId) {
      if (!mongoose.Types.ObjectId.isValid(routeId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid route ID format",
        });
      }

      routes = await CanvassingRoute.find({
        _id: routeId,
        campaignId: new mongoose.Types.ObjectId(campaignId),
      }).lean();
    } else {
      // Otherwise, get stats for all routes in the campaign
      routes = await CanvassingRoute.find({
        campaignId: new mongoose.Types.ObjectId(campaignId),
      }).lean();
    }

    // Calculate aggregated stats
    let totalAddresses = 0;
    let totalCompleted = 0;

    routes.forEach((route) => {
      const routeTotal = route.totalVoters || 0;
      const routeCompleted = route.completedVoters || 0;

      totalAddresses += routeTotal;
      totalCompleted += routeCompleted;
    });

    // Calculate overall progress percentage
    const progress = totalAddresses === 0 ? 0 : Math.round((totalCompleted / totalAddresses) * 100);

    return res.status(200).json({
      success: true,
      message: "Canvassing stats fetched successfully",
      data: {
        totalAddresses,
        completed: totalCompleted,
        progress,
      },
    });
  } catch (error) {
    console.error("getCanvassingStats error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch canvassing stats",
      error: error.message,
    });
  }
};

