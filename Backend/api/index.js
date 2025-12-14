import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import connectDb from "../config/db.js";
import UserRoutes from "../Routes/UserRoute.js";
import CampaignRoutes from "../Routes/CampaignRoute.js";
import VoterRoutes from "../Routes/VoterRoute.js";
import CanvassingRoutes from "../Routes/CanvassingRoute.js";
import VolunteerRoutes from "../Routes/VolunteerRoute.js";
import serverless from "serverless-http";
const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));



// Middleware
app.use(cors())
app.use(express.json());

// Request logging middleware (for debugging API calls)


// Initialize database connection


// Monitor mongoose connection events



// Routes
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/campaign", CampaignRoutes);
app.use("/api/v1/voter", VoterRoutes);
app.use("/api/v1/canvassing", CanvassingRoutes);
app.use("/api/v1/volunteer", VolunteerRoutes);

app.get('/',(req,res)=>{
  res.send({
     message:"welcome to campaign app"
  })
 })



// Start server - listen on all interfaces (0.0.0.0) to allow connections from other devices
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export const handler = serverless(app);
export default app;




