/**
 * Reply Routes
 * -----------
 * Endpoints for forum post replies (handled via forum routes)
 * This file is kept for backwards compatibility but replies are now
 * accessed through /api/forum/posts/:postId/replies
 */

const express = require('express');
const router = express.Router();

// Note: Reply routes are now integrated into forum.js
// All reply operations go through /api/forum/posts/:postId/replies

module.exports = router;