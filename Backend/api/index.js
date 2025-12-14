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
const PORT = process.env.PORT || 5000;
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const app = express();

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







// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import serverless from "serverless-http";

// import connectDb from "../config/db.js";

// import UserRoutes from "../Routes/UserRoute.js";
// import CampaignRoutes from "../Routes/CampaignRoute.js";
// import VoterRoutes from "../Routes/VoterRoute.js";
// import CanvassingRoutes from "../Routes/CanvassingRoute.js";
// import VolunteerRoutes from "../Routes/VolunteerRoute.js";

// dotenv.config(); // MUST be at top

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // DB Connection
// connectDb();

// // Routes
// app.use("/api/v1/user", UserRoutes);
// app.use("/api/v1/campaign", CampaignRoutes);
// app.use("/api/v1/voter", VoterRoutes);
// app.use("/api/v1/canvassing", CanvassingRoutes);
// app.use("/api/v1/volunteer", VolunteerRoutes);

// // Root route
// app.get("/", (req, res) => {
//   res.json({
//     message: "Welcome to Campaign Helper API",
//     status: "Server is running",
//     database:
//       mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
//   });
// });


// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`server is running on port ${PORT}`)
// // });
// // ❗ THIS is required for Vercel
// export const handler = serverless(app);
// // export default app;


