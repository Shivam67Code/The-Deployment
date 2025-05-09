require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const mealRoutes = require('./routes/mealRoutes');

const app = express();

// CORS middleware with more explicit configuration
const corsOptions = {
  origin: ["https://shivamstracker.netlify.app", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  credentials: true,
  exposedHeaders: ["Authorization"],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Explicitly handle OPTIONS requests
app.options('*', cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
  res.send("API is running...");
});

// Debug route to check CORS headers
app.get('/test-cors', (req, res) => {
  res.json({ message: "CORS is working!" });
});

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/meals", mealRoutes);

// Serve uploads folder 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));