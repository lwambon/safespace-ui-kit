/**
 * Moderators Routes
 * Endpoints for managing moderators and their activities
 */

const express = require('express');
const router = express.Router();
const ModeratorController = require('../controllers/moderatorController');
const { authenticateJWT } = require('../middleware/authMiddleware');

// Get all moderators
router.get('/', ModeratorController.getAllModerators);

// Get moderator statistics
router.get('/stats', ModeratorController.getModeratorStats);

// Get single moderator
router.get('/:id', ModeratorController.getModeratorById);

// Add new moderator (admin only)
router.post('/', authenticateJWT, ModeratorController.addModerator);

// Update moderator status
router.put('/:id/status', authenticateJWT, ModeratorController.updateModeratorStatus);

// Increment reports handled
router.post('/:id/increment', authenticateJWT, ModeratorController.incrementReportsHandled);

// Remove moderator (admin only)
router.delete('/:id', authenticateJWT, ModeratorController.removeModerator);

module.exports = router;