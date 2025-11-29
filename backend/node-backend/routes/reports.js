/**
 * Report Routes
 * -------------
 * Endpoints for submitting and retrieving reports.
 */

const express = require('express');
const router = express.Router();
const { createReport, getReports } = require('../controllers/reportController');
const { moderationCheck } = require('../middleware/moderationMiddleware');

// Create a new report → moderated
router.post('/', moderationCheck, createReport);

// Update a report (if edits are allowed) → moderated
router.put('/:id', moderationCheck, createReport);

// Fetch all reports → safe, no moderation
router.get('/', getReports);

module.exports = router;