const db = require('../db/connection');

/**
 * Get emergency contacts for a specific country
 */
const getEmergencyContacts = async (req, res) => {
  try {
    const { location } = req.body;
    
    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }

    const result = await db.query(
      `SELECT e.hotline_number, e.type, c.name, c.iso_code
       FROM emergency_contacts e
       JOIN countries c ON e.country_id = c.id
       WHERE LOWER(c.name) LIKE LOWER($1) OR LOWER(c.iso_code) = LOWER($2)
       ORDER BY e.type`,
      [`%${location}%`, location]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No emergency contacts found for this location' });
    }

    // Format response
    const country = result.rows[0];
    const contacts = {};
    result.rows.forEach(row => {
      contacts[row.type] = row.hotline_number;
    });

    res.json({
      location: country.name,
      iso_code: country.iso_code,
      contacts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch emergency contacts' });
  }
};

/**
 * Get list of all available countries
 */
const getAvailableCountries = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, name, iso_code FROM countries ORDER BY name'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
};

/**
 * Get hotline for a specific country
 */
const getHotline = async (req, res) => {
  try {
    const { country } = req.query;
    
    if (!country) {
      return res.status(400).json({ error: 'Country parameter is required' });
    }

    const result = await db.query(
      `SELECT e.hotline_number FROM emergency_contacts e
       JOIN countries c ON e.country_id = c.id
       WHERE LOWER(c.name) = LOWER($1)
       LIMIT 1`,
      [country]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No hotline found for this country' });
    }

    res.json({ hotline_number: result.rows[0].hotline_number });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch hotline' });
  }
};

/**
 * Submit emergency report
 */
const submitEmergencyReport = async (req, res) => {
  try {
    const { category, severity, description, location, lat, lng, user_id } = req.body;

    if (!category || !severity || !location) {
      return res.status(400).json({ 
        error: 'Category, severity, and location are required' 
      });
    }

    const result = await db.query(
      `INSERT INTO reports 
       (user_id, category, severity, description, lat, lng, location_text, is_anonymous, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, created_at`,
      [
        user_id || null,
        category,
        severity,
        description || null,
        lat || null,
        lng || null,
        location,
        true, // Default to anonymous for emergency reports
        'received'
      ]
    );

    res.status(201).json({
      success: true,
      report_id: result.rows[0].id,
      timestamp: result.rows[0].created_at,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit emergency report' });
  }
};

module.exports = { 
  getEmergencyContacts, 
  getAvailableCountries,
  getHotline,
  submitEmergencyReport,
};