/**
 * Analytics Routes
 * ----------------
 * Endpoints for logging and retrieving analytics events.
 */

const express = require('express');
const router = express.Router();

// Temporary in‑memory store for testing
let analytics = [];

// Log event (no auth for now)
router.post('/', (req, res) => {
  const { text, label, confidence, timestamp } = req.body;

  if (!text || !label) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const entry = { text, label, confidence, timestamp };
  analytics.push(entry);

  res.json({ message: "Analytics logged", entry });
});

// Get logs (no auth for now)
router.get('/', (req, res) => {
  res.json(analytics);
});

module.exports = router;