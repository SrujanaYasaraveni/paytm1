const express = require('express');
const { initiateTransaction } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Initiate transaction (protected route)
router.post('/send', protect, initiateTransaction);

module.exports = router;