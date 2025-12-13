import express from "express";
import {
  assignRoutesToVolunteerController,
  getAssignedRoutesController,
  checkIfVolunteerController,
  getCampaignVolunteersController,
  removeRouteAssignmentController,
} from "../Controllers/VolunteerController.js";

const router = express.Router();

// ✅ Assign routes to volunteer
router.post("/assign", assignRoutesToVolunteerController);

// ✅ Get routes assigned to volunteer
router.get("/assigned-routes", getAssignedRoutesController);

// ✅ Check if user is volunteer
router.get("/check", checkIfVolunteerController);

// ✅ Get campaign volunteers
router.get("/campaign-volunteers", getCampaignVolunteersController);

// ✅ Remove route assignment
router.delete("/assignment/:assignmentId", removeRouteAssignmentController);

export default router;


