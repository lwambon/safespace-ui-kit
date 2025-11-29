/**
 * Hotspot Controller
 * ------------------
 * Handles geographic hotspot data for harassment/risk areas
 */

const db = require('../db/connection');

/**
 * Get all hotspots
 */
const getHotspots = async (req, res) => {
  try {
    const { limit = 100, offset = 0 } = req.query;
    const result = await db.query(
      `SELECT * FROM hotspots 
       ORDER BY report_count DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch hotspots' });
  }
};

/**
 * Get a single hotspot
 */
const getHotspot = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `SELECT * FROM hotspots WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hotspot not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch hotspot' });
  }
};

/**
 * Get hotspots within a radius
 */
const getHotspotsNearby = async (req, res) => {
  try {
    const { lat, lng, radius_km = 5 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const result = await db.query(
      `SELECT *, 
              (6371 * acos(cos(radians($1)) * cos(radians(lat)) * cos(radians(lng) - radians($2)) + 
              sin(radians($1)) * sin(radians(lat)))) AS distance
       FROM hotspots
       WHERE (6371 * acos(cos(radians($1)) * cos(radians(lat)) * cos(radians(lng) - radians($2)) + 
              sin(radians($1)) * sin(radians(lat)))) < $3
       ORDER BY distance ASC`,
      [parseFloat(lat), parseFloat(lng), parseFloat(radius_km)]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch nearby hotspots' });
  }
};

/**
 * Get hotspot statistics
 */
const getHotspotStats = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
        COUNT(*) as total_hotspots,
        AVG(report_count) as avg_reports_per_hotspot,
        MAX(report_count) as max_reports,
        MIN(report_count) as min_reports
       FROM hotspots`
    );

    const statsRow = result.rows[0];

    // Get highest risk hotspot
    const highestResult = await db.query(
      `SELECT * FROM hotspots ORDER BY report_count DESC LIMIT 1`
    );

    res.json({
      total_hotspots: parseInt(statsRow.total_hotspots),
      avg_reports_per_hotspot: parseFloat(statsRow.avg_reports_per_hotspot || 0),
      max_reports: parseInt(statsRow.max_reports || 0),
      min_reports: parseInt(statsRow.min_reports || 0),
      highest_risk: highestResult.rows[0] || null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch hotspot statistics' });
  }
};

/**
 * Create a new hotspot
 */
const createHotspot = async (req, res) => {
  try {
    const { lat, lng, location_text } = req.body;

    if (!lat || !lng || !location_text) {
      return res.status(400).json({ 
        error: 'Latitude, longitude, and location_text are required' 
      });
    }

    const result = await db.query(
      `INSERT INTO hotspots (lat, lng, location_text, report_count)
       VALUES ($1, $2, $3, 0)
       RETURNING *`,
      [lat, lng, location_text]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create hotspot' });
  }
};

/**
 * Update a hotspot
 */
const updateHotspot = async (req, res) => {
  try {
    const { id } = req.params;
    const { lat, lng, location_text, report_count } = req.body;

    const result = await db.query(
      `UPDATE hotspots 
       SET lat = COALESCE($1, lat),
           lng = COALESCE($2, lng),
           location_text = COALESCE($3, location_text),
           report_count = COALESCE($4, report_count),
           last_updated = NOW()
       WHERE id = $5
       RETURNING *`,
      [lat, lng, location_text, report_count, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hotspot not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update hotspot' });
  }
};

/**
 * Delete a hotspot
 */
const deleteHotspot = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      `DELETE FROM hotspots WHERE id = $1 RETURNING id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hotspot not found' });
    }

    res.json({ message: 'Hotspot deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete hotspot' });
  }
};

/**
 * Get heatmap data
 */
const getHeatmapData = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT lat, lng, report_count as weight FROM hotspots WHERE report_count > 0`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch heatmap data' });
  }
};

module.exports = {
  getHotspots,
  getHotspot,
  getHotspotsNearby,
  getHotspotStats,
  createHotspot,
  updateHotspot,
  deleteHotspot,
  getHeatmapData,
};