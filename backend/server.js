require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const mealRoutes = require("./routes/mealRoutes");

const app = express();

// Middleware to handle CORS
const corsOptions = {
  origin: [
    "https://shivamstracker.netlify.app", // Netlify Frontend
    "http://localhost:3000",              // Localhost for dev frontend
    "http://localhost:8000",              // Local backend for dev
    "http://localhost:5000",              // Local backend for dev
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // Include OPTIONS method
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  exposedHeaders: ["Authorization"],
};

// Allow CORS for all routes and handle preflight requests
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Explicitly handle OPTIONS method

app.use(express.json());

// Simple health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// API version route
app.get("/api/v1", (req, res) => {
  res.send("Welcome to the API v1");
});

// Connect to the database
connectDB();

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/meals", mealRoutes);

// Serve uploads folder (optional, depending on your app)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
