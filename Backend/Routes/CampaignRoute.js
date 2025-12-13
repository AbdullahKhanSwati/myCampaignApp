import express from "express";
import { createCampaign, getUserCampaignsController } from "../Controllers/CampaignController.js";
import upload from "../Middlewares/uploadMiddleware.js";

const router = express.Router();

// Route for creating a new campaign with CSV file upload
router.post("/create-campaign", upload.single("csvFile"), createCampaign);

// Route for fetching all campaigns for a specific user
router.get("/get-user-campaigns", getUserCampaignsController);

export default router;

