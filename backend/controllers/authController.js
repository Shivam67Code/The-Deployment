const jwt = require('jsonwebtoken');
const User = require('../models/Users');

// Generate JWT Token 
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET environment variable is not set");
    throw new Error("Server configuration error");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register User
exports.registerUser = async (req, res) => {
  try {
    // Enhanced debugging for production issues
    console.log("🟢 Register attempt received");
    console.log("Content-Type:", req.headers['content-type']);
    console.log("Request body type:", typeof req.body);

    // Check if req.body exists before trying to destructure from it
    if (!req.body) {
      console.error("❌ Request body missing");
      return res.status(400).json({ message: "Request body is missing" });
    }

    // Log the request body to debug
    console.log("Request body:", JSON.stringify(req.body));

    const { fullName, email, password, profileImageUrl } = req.body || {};
    console.log("Parsed fields:", { fullName: !!fullName, email: !!email, password: !!password });

    // Validation: Check for missing fields
    if (!fullName || !email || !password) {
      console.error("❌ Missing required fields");
      return res.status(400).json({ message: "All Fields are Required 📂" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email Already Exists" });
    }

    // Create the user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });    // Generate token for the new user
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token, // Include the token in the response
    });
  } catch (err) {
    console.error("Registration error:", err);
    console.error("Error name:", err.name);
    console.error("Error code:", err.code);
    console.error("Error message:", err.message);
    console.error("Error stack:", err.stack);

    // Handle specific error types
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Email already in use",
        error: err.message
      });
    }

    // Handle validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        message: messages.join(', '),
        error: err.message
      });
    }

    // Always return the full error details in response for now to help debug
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: err.message,
      stack: err.stack
    });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    // Enhanced debugging for production issues
    console.log("🟢 Login attempt received");
    console.log("Content-Type:", req.headers['content-type']);
    console.log("Request body type:", typeof req.body);
    console.log("Request body:", JSON.stringify(req.body));

    const { email, password } = req.body || {};
    console.log('Login attempt for:', email ? email : 'email missing');

    // Validate request
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({
        success: false,
        message: "Please provide email and password"
      });
    }

    // Find the user
    const user = await User.findOne({ email });
    console.log('User found:', !!user);

    // Check if user exists and password matches
    if (user && (await user.comparePassword(password))) {
      const token = generateToken(user._id);
      console.log('Login successful, token generated:', token.substring(0, 10) + '...');

      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        token,
      });
    } else {
      console.log('Invalid credentials');
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// Get User Information
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Get user info error:", err);
    res.status(500).json({ message: "Error fetching user information", error: err.message });
  }
};

// Get User
exports.getUser = async (req, res) => {
  try {
    const user = req.user;

    // Return user data with the proper field names matching your model
    res.status(200).json({
      _id: user._id,
      id: user._id, // Include both formats for compatibility
      fullName: user.fullName,
      email: user.email,
      profileImageUrl: user.profileImageUrl
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};