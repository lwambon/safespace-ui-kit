/**
 * Moderation Routes
 * -------
 * Endpoints for content moderation and safety checks
 */

const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/authMiddleware');
const {
  checkContent,
  detectHarassment,
  batchCheck,
  getModerationStats,
  reportContent,
} = require('../controllers/moderationController');

// Check if content is safe
router.post('/check', checkContent);

// Detect harassment in text
router.post('/detect-harassment', detectHarassment);

// Batch check multiple contents
router.post('/batch-check', batchCheck);

// Get moderation statistics (admin only)
router.get('/stats', authenticateJWT, getModerationStats);

// Report flagged content
router.post('/report', reportContent);

module.exports = router;
