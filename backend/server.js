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

// ✅ CORS middleware with dynamic Netlify preview URL support
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://shivamstracker.netlify.app',
      'http://localhost:5173',
      'https://the-deployment.vercel.app'
    ];

    const netlifyPreviewPattern = /^https:\/\/[a-z0-9\-]+--shivamstracker\.netlify\.app$/;

    if (
      !origin || // allow tools like Postman
      allowedOrigins.includes(origin) ||
      netlifyPreviewPattern.test(origin)
    ) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version',
    'Content-Length', 'Content-MD5', 'Content-Type', 'Date',
    'X-Api-Version', 'Authorization'
  ],
  credentials: true,
  exposedHeaders: ['Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Explicitly handle OPTIONS requests
app.options('*', cors(corsOptions));

app.use(express.json());

// ✅ Health check endpoint
app.get('/', (req, res) => {
  res.send("✅ API is running...");
});

// ✅ Debug route to verify CORS
app.get('/test-cors', (req, res) => {
  res.json({ message: "✅ CORS is working!" });
});

// ✅ Connect MongoDB
connectDB();

// ✅ API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/meals", mealRoutes);

// ✅ Serve static files (e.g., image uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
