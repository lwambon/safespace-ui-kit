/**
 * Emergency Routes
 * ----------------
 * Endpoints for fetching emergency contacts/services.
 */

const express = require('express');
const router = express.Router();
const { getEmergencyContacts } = require('../controllers/emergencyController');

// Get emergency contacts (public)
router.get('/', getEmergencyContacts);

module.exports = router;