const express = require('express');
const router = express.Router();
const AccordionController = require('../controllers/accordionController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all accordion sections
router.get('/sections', AccordionController.getAllSections);

// Get accordion section by ID
router.get('/sections/:id', AccordionController.getSectionById);

// Create new accordion section (admin only)
router.post('/sections', authMiddleware, AccordionController.createSection);

// Update accordion section (admin only)
router.put('/sections/:id', authMiddleware, AccordionController.updateSection);

// Delete accordion section (admin only)
router.delete('/sections/:id', authMiddleware, AccordionController.deleteSection);

// Get user accordion preferences
router.get('/preferences/:userId', authMiddleware, AccordionController.getUserPreferences);

// Save accordion state/preferences
router.post('/preferences/:userId', authMiddleware, AccordionController.saveUserPreferences);

module.exports = router;
