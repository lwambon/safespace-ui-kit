/**
 * Emergency Routes
 * ----------------
 * Endpoints for emergency services and rapid response
 */

const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/authMiddleware');
const { 
  getEmergencyContacts, 
  getAvailableCountries,
  getHotline,
  submitEmergencyReport,
} = require('../controllers/emergencyController');

// Get emergency contacts for a location (POST for flexibility)
router.post('/contacts', getEmergencyContacts);

// Get list of available countries
router.get('/countries', getAvailableCountries);

// Get hotline for a country
router.get('/hotline', getHotline);

// Submit emergency report
router.post('/report', submitEmergencyReport);

module.exports = router;