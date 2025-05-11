const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increased for Render's cold start
      socketTimeoutMS: 60000, // Increased socket timeout
      connectTimeoutMS: 30000 // Added connection timeout
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Log more detailed error information in development
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
    process.exit(1);
  }
};

module.exports = connectDB;