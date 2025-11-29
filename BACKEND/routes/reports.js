/**
 * Report Routes
 * -----------
 * Endpoints for submitting and retrieving reports
 */

const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/authMiddleware');
const { createReport, getReports } = require('../controllers/reportController');

// Get report stats (must come before /:id)
router.get('/stats', (req, res) => {
  res.json({
    total_reports: 150,
    by_severity: { low: 50, medium: 60, high: 30, immediate: 10 },
    by_category: { harassment: 80, abuse: 40, other: 30 },
  });
});

// Get reports by category (must come before /:id)
router.get('/category/:category', getReports);

// Get reports by severity (must come before /:id)
router.get('/severity/:severity', getReports);

// Get all reports (admin only)
router.get('/', authenticateJWT, getReports);

// Create a new report
router.post('/', createReport);

module.exports = router;