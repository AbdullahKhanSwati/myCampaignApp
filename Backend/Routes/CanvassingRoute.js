import express from "express";
import {
  createCanvassingRoute,
  getRouteById,
  getRoutesByCampaign,
  previewCanvassingRoute,
  updateRouteStatus,
  updateRouteVoterStatus,
  getCanvassingStats
} from "../Controllers/CanvassingRouteController.js";

const router = express.Router();

router.post("/preview", previewCanvassingRoute);
router.post("/", createCanvassingRoute);
router.get("/stats", getCanvassingStats);
router.get("/", getRoutesByCampaign);
router.get("/:routeId", getRouteById);
router.patch("/:routeId/status", updateRouteStatus);
router.patch("/:routeId/voters/:voterId/status", updateRouteVoterStatus);

export default router;

