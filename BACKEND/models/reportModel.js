/**
 * Report Model
 * ------------
 * Handles incident reports:
 * - Create new report
 * - Fetch all reports
 */

const db = require('../db/connection');

const createReport = async ({ userId, category, severity, description, lat, lng, locationText, isAnonymous }) => {
  const result = await db.query(
    `INSERT INTO reports (user_id, category, severity, description, lat, lng, location_text, is_anonymous)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING *`,
    [userId, category, severity, description, lat, lng, locationText, isAnonymous]
  );
  return result.rows[0];
};

const getReports = async () => {
  const result = await db.query(`SELECT * FROM reports ORDER BY timestamp DESC`);
  return result.rows;
};

module.exports = { createReport, getReports };