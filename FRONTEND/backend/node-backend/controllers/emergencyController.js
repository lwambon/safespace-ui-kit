const db = require('../db/connection');

const getEmergencyContacts = async (req, res) => {
  try {
    const { country } = req.query;
    const result = await db.query(
      `SELECT e.hotline_number, e.type, c.name 
       FROM emergency_contacts e
       JOIN countries c ON e.country_id = c.id
       WHERE LOWER(c.name) = LOWER($1)`,
      [country]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No emergency contacts found for this country' });
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch emergency contacts' });
  }
};

module.exports = { getEmergencyContacts };