/**
 * Hotspot Model
 * -------------
 * Handles hotspot detection:
 * - Update hotspot count
 * - Get all hotspots
 */

const db = require('../db/connection');

const updateHotspot = async ({ lat, lng, locationText }) => {
  const result = await db.query(
    `INSERT INTO hotspots (lat, lng, location_text, report_count)
     VALUES ($1,$2,$3,1)
     ON CONFLICT (lat,lng) DO UPDATE 
     SET report_count = hotspots.report_count + 1, last_updated = NOW()
     RETURNING *`,
    [lat, lng, locationText]
  );
  return result.rows[0];
};

const getHotspots = async () => {
  const result = await db.query(`SELECT * FROM hotspots ORDER BY report_count DESC`);
  return result.rows;
};

module.exports = { updateHotspot, getHotspots };