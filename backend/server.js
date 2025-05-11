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

// ✅ CORS middleware with properly configured origins
const corsOptions = {
  origin: function (origin, callback) {
    // Allow these specific origins
    const allowedOrigins = [
      'https://shivamstracker.netlify.app',
      'https://www.shivamstracker.netlify.app',
      // Netlify preview deployments (using wildcard)
      /https:\/\/[a-z0-9-]+--shivamstracker\.netlify\.app$/,
      // For local development
      'http://localhost:5173',
      'http://localhost:3000'
    ];

    // Check if origin is allowed or if it's a same-origin request (origin is null)
    if (!origin || allowedOrigins.some(allowed =>
      typeof allowed === 'string' ? allowed === origin : allowed.test(origin)
    )) {
      callback(null, true);
    } else {
      console.log(`❌ CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version',
    'Content-Length', 'Content-MD5', 'Content-Type', 'Date',
    'X-Api-Version', 'Authorization'
  ],
  exposedHeaders: ['Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 86400 // 24 hours
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Body parser middleware with increased limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ✅ Health check endpoint with detailed status
app.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    message: '✅ API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    cors: {
      enabled: true,
      allowedOrigins: corsOptions.origin.toString()
    }
  });
});

// ✅ Debug route to verify CORS
app.get('/test-cors', (req, res) => {
  res.json({ message: "✅ CORS is working!" });
});

// ✅ Connect MongoDB first
connectDB();

// ✅ Mount routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/meals", mealRoutes);

// ✅ Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Enhanced error handling middleware - should be after routes
const errorHandler = (err, req, res, next) => {
  console.error('🔴 Error:', err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

// Apply error handler - must be after routes
app.use(errorHandler);

// ✅ Start server with enhanced error handling
const PORT = process.env.PORT || 10000;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔑 MongoDB connection: ${process.env.MONGO_URI ? 'Configured' : 'Missing'}`);
  console.log(`🔑 JWT Secret: ${process.env.JWT_SECRET ? 'Configured' : 'Missing'}`);
}).on('error', (error) => {
  console.error('❌ Server failed to start:', error);
  process.exit(1);
});

// Set server timeouts for Render's environment
server.timeout = 120000; // 2 minutes
server.keepAliveTimeout = 121000; // Slightly higher than timeout
server.headersTimeout = 122000; // Slightly higher than keepAliveTimeout

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received. Performing graceful shutdown...');
  server.close(() => {
    console.log('✅ Server closed. Exiting process.');
    process.exit(0);
  });
});
