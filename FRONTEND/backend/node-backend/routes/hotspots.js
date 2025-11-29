/**
 * Hotspot Routes
 * --------------
 * Endpoints for updating and retrieving hotspots.
 */

const express = require('express');
const router = express.Router();
const { updateHotspot, getHotspots } = require('../controllers/hotspotController');
const { authenticateJWT } = require('../middleware/authMiddleware');

// Update hotspot (protected)
router.post('/', authenticateJWT, updateHotspot);

// Get hotspots (public)
router.get('/', getHotspots);

module.exports = router;