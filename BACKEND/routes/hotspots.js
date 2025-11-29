/**
 * Hotspot Routes
 * -----------
 * Endpoints for geographic hotspot data
 */

const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/authMiddleware');
const {
  getHotspots,
  getHotspot,
  getHotspotsNearby,
  getHotspotStats,
  createHotspot,
  updateHotspot,
  deleteHotspot,
  getHeatmapData,
} = require('../controllers/hotspotController');

// Get all hotspots
router.get('/', getHotspots);

// Get hotspot statistics (must come before /:id)
router.get('/stats', getHotspotStats);

// Get heatmap data (must come before /:id)
router.get('/heatmap', getHeatmapData);

// Get nearby hotspots (must come before /:id)
router.get('/nearby', getHotspotsNearby);

// Get single hotspot
router.get('/:id', getHotspot);

// Create hotspot (admin only)
router.post('/', authenticateJWT, createHotspot);

// Update hotspot (admin only)
router.put('/:id', authenticateJWT, updateHotspot);

// Delete hotspot (admin only)
router.delete('/:id', authenticateJWT, deleteHotspot);

module.exports = router;