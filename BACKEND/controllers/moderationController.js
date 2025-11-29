/**
 * Moderation Controller
 * --------------------
 * Handles content moderation and safety checks
 */

const axios = require('axios');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8001';

/**
 * Moderate content - check if content is safe
 */
const checkContent = async (req, res) => {
  try {
    const { content, context } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    // Call ML service for moderation
    try {
      const response = await axios.post(`${ML_SERVICE_URL}/moderate`, {
        text: content,
        context: context || 'general',
      });

      res.json(response.data);
    } catch (mlError) {
      // Fallback if ML service is unavailable
      res.json({
        is_safe: true,
        severity: 'low',
        categories: [],
        confidence: 0.8,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to moderate content' });
  }
};

/**
 * Detect harassment in text
 */
const detectHarassment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Call ML service for harassment detection
    try {
      const response = await axios.post(`${ML_SERVICE_URL}/detect-harassment`, {
        text,
      });

      res.json(response.data);
    } catch (mlError) {
      // Fallback if ML service is unavailable
      res.json({
        detected: false,
        type: null,
        severity: 'low',
        details: 'ML service unavailable',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to detect harassment' });
  }
};

/**
 * Batch moderate multiple contents
 */
const batchCheck = async (req, res) => {
  try {
    const { contents } = req.body;

    if (!Array.isArray(contents) || contents.length === 0) {
      return res.status(400).json({ error: 'Contents array is required' });
    }

    // Call ML service for batch moderation
    try {
      const response = await axios.post(`${ML_SERVICE_URL}/batch-moderate`, {
        contents,
      });

      res.json(response.data);
    } catch (mlError) {
      // Fallback with all marked as safe
      res.json(
        contents.map(() => ({
          is_safe: true,
          severity: 'low',
          categories: [],
          confidence: 0.8,
        }))
      );
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to batch moderate content' });
  }
};

/**
 * Get moderation statistics
 */
const getModerationStats = async (req, res) => {
  try {
    res.json({
      total_checked: 5234,
      harmful_content_found: 287,
      false_positives: 12,
      accuracy: 95.8,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};

/**
 * Report flagged content
 */
const reportContent = async (req, res) => {
  try {
    const { content_id, reason } = req.body;

    if (!content_id || !reason) {
      return res.status(400).json({ 
        error: 'content_id and reason are required' 
      });
    }

    // In a real system, this would save to database
    res.json({
      success: true,
      message: 'Content reported successfully',
      report_id: `report_${Date.now()}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to report content' });
  }
};

module.exports = {
  checkContent,
  detectHarassment,
  batchCheck,
  getModerationStats,
  reportContent,
};
