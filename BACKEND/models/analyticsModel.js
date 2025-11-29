/**
 * Analytics Model
 * ---------------
 * Handles logging events for moderation and dashboards:
 * - Log new event
 * - Fetch logs
 */

const db = require('../db/connection');

const logEvent = async ({ eventType, payload }) => {
  const result = await db.query(
    `INSERT INTO analytics_logs (event_type, payload)
     VALUES ($1,$2)
     RETURNING *`,
    [eventType, payload]
  );
  return result.rows[0];
};

const getLogs = async () => {
  const result = await db.query(`SELECT * FROM analytics_logs ORDER BY created_at DESC`);
  return result.rows;
};

module.exports = { logEvent, getLogs };