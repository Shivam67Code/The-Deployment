const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const {
  registerUser,
  loginUser,
  getUserInfo,
  getUser,
} = require('../controllers/authController');

const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/getUser', protect, getUserInfo);

router.get('/user', protect, getUser);

router.post("/upload-image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Use a relative path that works in both local and production environments
    // This assumes your backend is properly configured to serve static files from /uploads
    const imageUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      imageUrl,
      fullUrl: `${req.protocol}://${req.get("host")}${imageUrl}`
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading image",
      error: error.message
    });
  }
});

module.exports = router;