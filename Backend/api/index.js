// import cors from "cors";
// import dotenv from "dotenv";
// import express from "express";
// import mongoose from "mongoose";
// import connectDb from "../config/db.js";
// import UserRoutes from "../Routes/UserRoute.js";
// import CampaignRoutes from "../Routes/CampaignRoute.js";
// import VoterRoutes from "../Routes/VoterRoute.js";
// import CanvassingRoutes from "../Routes/CanvassingRoute.js";
// import VolunteerRoutes from "../Routes/VolunteerRoute.js";
// const PORT = process.env.PORT || 5000;
// dotenv.config();
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Initialize database connection
// connectDb().catch((error) => {
//   console.error("Failed to connect to database:", error);
//   // Server will still start, but database operations will fail
// });

// // Monitor mongoose connection events
// mongoose.connection.on('connected', () => {
//   console.log('✅ Mongoose connection event: CONNECTED');
//   console.log(`📊 readyState: ${mongoose.connection.readyState}`);
// });

// mongoose.connection.on('error', (err) => {
//   console.error('❌ Mongoose connection event: ERROR', err);
// });

// mongoose.connection.on('disconnected', () => {
//   console.log('⚠️ Mongoose connection event: DISCONNECTED');
//   console.log(`📊 readyState: ${mongoose.connection.readyState}`);
// });

// // Routes
// app.use("/api/v1/user", UserRoutes);
// app.use("/api/v1/campaign", CampaignRoutes);
// app.use("/api/v1/voter", VoterRoutes);
// app.use("/api/v1/canvassing", CanvassingRoutes);
// app.use("/api/v1/volunteer", VolunteerRoutes);

// // Root route
// app.get('/',(req,res)=>{
//     // Check connection state properly
//     const readyState = mongoose.connection.readyState;
//     const stateNames = {
//         0: "Disconnected",
//         1: "Connected", 
//         2: "Connecting",
//         3: "Disconnecting"
//     };
    
//     const dbStatus = stateNames[readyState] || `Unknown (${readyState})`;
    
//     // Log for debugging
//     console.log(`[Root Route] DB readyState: ${readyState} (${dbStatus})`);
    
//     res.send({
//        message:"Welcome to Campaign Helper API",
//        status: "Server is running",
//        database: dbStatus,
//        readyState: readyState
//     })
// })

// // Error handling middleware (should be after routes)
// app.use((err, req, res, next) => {
//   console.error("Error:", err);
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || "Internal server error",
//     ...(process.env.NODE_ENV === "development" && { stack: err.stack })
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route ${req.method} ${req.path} not found`
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📡 API Base URL: http://localhost:${PORT}/api/v1`);
//   console.log(`🔗 Test endpoint: http://localhost:${PORT}/`);
// });

// // export const handler = serverless(app);
// // export default app;







import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import serverless from "serverless-http";

import connectDb from "../config/db.js";

import UserRoutes from "../Routes/UserRoute.js";
import CampaignRoutes from "../Routes/CampaignRoute.js";
import VoterRoutes from "../Routes/VoterRoute.js";
import CanvassingRoutes from "../Routes/CanvassingRoute.js";
import VolunteerRoutes from "../Routes/VolunteerRoute.js";

dotenv.config(); // MUST be at top

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
connectDb();

// Routes
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/campaign", CampaignRoutes);
app.use("/api/v1/voter", VoterRoutes);
app.use("/api/v1/canvassing", CanvassingRoutes);
app.use("/api/v1/volunteer", VolunteerRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Campaign Helper API",
    status: "Server is running",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`server is running on port ${PORT}`)
// });
// ❗ THIS is required for Vercel
export const handler = serverless(app);
// export default app;


