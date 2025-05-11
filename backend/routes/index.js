const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const expenseRoutes = require('./expenseRoutes');
const incomeRoutes = require('./incomeRoutes');
const userRoutes = require('./userRoutes');

// Routes
router.use('/auth', authRoutes);
router.use('/expense', expenseRoutes);
router.use('/income', incomeRoutes);
router.use('/user', userRoutes);

module.exports = router;