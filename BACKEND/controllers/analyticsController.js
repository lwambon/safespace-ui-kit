/**
 * Analytics Controller
 * -------------------
 * Handles analytics logging and metrics retrieval
 */

const db = require('../db/connection');

/**
 * Log an analytics event
 */
const logEvent = async (req, res) => {
  try {
    const { eventType, payload } = req.body;

    if (!eventType) {
      return res.status(400).json({ error: 'eventType is required' });
    }

    const result = await db.query(
      `INSERT INTO analytics_logs (event_type, payload)
       VALUES ($1, $2)
       RETURNING *`,
      [eventType, payload ? JSON.stringify(payload) : null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to log event' });
  }
};

/**
 * Get analytics logs
 */
const getLogs = async (req, res) => {
  try {
    const { limit = 100, offset = 0, eventType } = req.query;
    let query = 'SELECT * FROM analytics_logs';
    const params = [];

    if (eventType) {
      query += ' WHERE event_type = $1';
      params.push(eventType);
      query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(limit, offset);
    } else {
      query += ` ORDER BY created_at DESC LIMIT $1 OFFSET $2`;
      params.push(limit, offset);
    }

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
};

/**
 * Get dashboard metrics
 */
const getDashboardMetrics = async (req, res) => {
  try {
    const { timeRange = '7d' } = req.query;

    // Calculate time range
    let daysAgo = 7;
    if (timeRange === '30d') daysAgo = 30;
    if (timeRange === '1d') daysAgo = 1;

    const metricsResult = await db.query(
      `SELECT 
        COUNT(*) as total_reports,
        COUNT(DISTINCT user_id) as active_users,
        AVG(EXTRACT(EPOCH FROM (updated_at - timestamp))) as avg_response_time
       FROM reports 
       WHERE timestamp > NOW() - INTERVAL '${daysAgo} days'`
    );

    const metrics = metricsResult.rows[0];

    res.json({
      total_reports: parseInt(metrics.total_reports),
      active_users: parseInt(metrics.active_users),
      incidents_prevented: Math.floor(parseInt(metrics.total_reports) * 0.15),
      avg_response_time: parseFloat(metrics.avg_response_time || 0).toFixed(2),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dashboard metrics' });
  }
};

/**
 * Get incident type distribution
 */
const getIncidentTypes = async (req, res) => {
  try {
    const { timeRange = '7d' } = req.query;

    let daysAgo = 7;
    if (timeRange === '30d') daysAgo = 30;
    if (timeRange === '1d') daysAgo = 1;

    const result = await db.query(
      `SELECT category, COUNT(*) as count 
       FROM reports 
       WHERE timestamp > NOW() - INTERVAL '${daysAgo} days'
       GROUP BY category
       ORDER BY count DESC`
    );

    const total = result.rows.reduce((sum, row) => sum + parseInt(row.count), 0);

    res.json(
      result.rows.map(row => ({
        type: row.category,
        count: parseInt(row.count),
        percentage: parseFloat(((parseInt(row.count) / total) * 100).toFixed(2)),
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch incident types' });
  }
};

/**
 * Get demographic data
 */
const getDemographics = async (req, res) => {
  try {
    const { timeRange = '7d' } = req.query;

    let daysAgo = 7;
    if (timeRange === '30d') daysAgo = 30;
    if (timeRange === '1d') daysAgo = 1;

    const result = await db.query(
      `SELECT COUNT(*) as count FROM reports 
       WHERE timestamp > NOW() - INTERVAL '${daysAgo} days'
       GROUP BY is_anonymous`
    );

    res.json({
      anonymous_reports: result.rows.find(r => r.row.is_anonymous)?.count || 0,
      identified_reports: result.rows.find(r => !r.row.is_anonymous)?.count || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch demographics' });
  }
};

module.exports = {
  logEvent,
  getLogs,
  getDashboardMetrics,
  getIncidentTypes,
  getDemographics,
};