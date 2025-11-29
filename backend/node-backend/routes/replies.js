/**
 * Reply Routes
 * ------------
 * Endpoints for creating and retrieving replies.
 */

const express = require('express');
const router = express.Router();
const { createReply, getRepliesByPost } = require('../controllers/replyController');
const { moderationCheck } = require('../middleware/moderationMiddleware');

// Create a new reply → moderated
router.post('/', moderationCheck, createReply);

// Update a reply (if edits are allowed) → moderated
router.put('/:id', moderationCheck, createReply);

// Fetch replies for a post → safe, no moderation
router.get('/:postId', getRepliesByPost);

module.exports = router;