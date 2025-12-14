import cors from "cors";
import dotenv from "dotenv";
import express from "express";
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

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Request logging middleware (for debugging API calls)
app.use((req, res, next) => {
  console.log(`\n📥 [${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
  if (req.query && Object.keys(req.query).length > 0) {
    console.log(`   Query:`, req.query);
  }
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0 && req.method !== 'GET') {
    console.log(`   Body:`, req.body);
  }
  next();
});

// Root route - no DB connection needed for health check (must be before DB middleware)
app.get('/', (req, res) => {
  res.json({
    message: "welcome to campaign app"
  });
});

// Database connection middleware - ensures DB is connected before handling API requests
app.use(async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (error) {
    console.error("❌ Database connection error:", error);
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
    });
  }
});

// Routes
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/campaign", CampaignRoutes);
app.use("/api/v1/voter", VoterRoutes);
app.use("/api/v1/canvassing", CanvassingRoutes);
app.use("/api/v1/volunteer", VolunteerRoutes);

// Error handling middleware (should be after routes)
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});

// 404 handler (must be last, after all routes)
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
    availableRoutes: [
      "GET /",
      "POST /api/v1/user/register",
      "POST /api/v1/user/login",
      "GET /api/v1/campaign/*",
      "GET /api/v1/voter/*",
      "GET /api/v1/canvassing/*",
      "GET /api/v1/volunteer/*"
    ]
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API Base URL: http://localhost:${PORT}/api/v1`);
  });
}

// For Vercel serverless
export const handler = serverless(app);
export default app;




