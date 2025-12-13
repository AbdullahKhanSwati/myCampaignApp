import express from "express";
import {
  getVotersByCampaignIdController,
  getVoterStatsByCampaignIdController,
  updateVoterStatusController,
  updateVoterCurrentNotesController,
  updateVoterDetailsController
} from "../Controllers/VoterController.js";

const router = express.Router();

// ✅ Get voters by campaign ID
router.get("/getAllVoters", getVotersByCampaignIdController);

// ✅ Get voter statistics by campaign ID
router.get("/stats", getVoterStatsByCampaignIdController);

// ✅ Update voter status
router.patch("/status/:voterId", updateVoterStatusController);

// ✅ Update voter current notes
router.patch("/notes/:voterId", updateVoterCurrentNotesController);

// ✅ Update voter details
router.put("/:voterId", updateVoterDetailsController);

export default router;
