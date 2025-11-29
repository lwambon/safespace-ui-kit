/**
 * Analytics Routes
 * -------
 * Endpoints for logging and retrieving analytics events
 */

const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/authMiddleware');
const {
  logEvent,
  getLogs,
  getDashboardMetrics,
  getIncidentTypes,
  getDemographics,
} = require('../controllers/analyticsController');

// Log an event
router.post('/log', logEvent);

// Get all logs (admin only)
router.get('/', authenticateJWT, getLogs);

// Get dashboard metrics
router.get('/dashboard/metrics', getDashboardMetrics);

// Get incident type distribution
router.get('/dashboard/incident-types', getIncidentTypes);

// Get demographic data
router.get('/dashboard/demographics', getDemographics);

// Get engagement metrics
router.get('/engagement', (req, res) => {
  res.json({
    daily_active_users: 245,
    weekly_active_users: 1240,
    monthly_active_users: 4500,
    avg_session_duration: 12.5,
  });
});

// Get safety statistics
router.get('/safety-stats', (req, res) => {
  res.json({
    incidents_reported: 150,
    incidents_resolved: 142,
    avg_resolution_time: 2.3,
    prevention_rate: 94.7,
  });
});

module.exports = router;