const db = require('../db/connection');

const AccordionModel = {
  // Get all accordion sections
  getAllSections: async () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM accordion_sections WHERE is_active = TRUE ORDER BY display_order ASC';
      db.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  // Get sections by category
  getSectionsByCategory: async (category) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM accordion_sections WHERE category = ? AND is_active = TRUE ORDER BY display_order ASC';
      db.query(query, [category], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  // Get section by ID
  getSectionById: async (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM accordion_sections WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0] || null);
      });
    });
  },

  // Create new section
  createSection: async (title, content, displayOrder, isActive, category) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO accordion_sections (title, content, display_order, is_active, category, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, NOW(), NOW())
      `;
      db.query(query, [title, content, displayOrder, isActive, category], (err, results) => {
        if (err) reject(err);
        else resolve(results.insertId);
      });
    });
  },

  // Update section
  updateSection: async (id, title, content, displayOrder, isActive, category) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE accordion_sections 
        SET title = ?, content = ?, display_order = ?, is_active = ?, category = ?, updated_at = NOW()
        WHERE id = ?
      `;
      db.query(query, [title, content, displayOrder, isActive, category, id], (err, results) => {
        if (err) reject(err);
        else resolve(results.affectedRows > 0);
      });
    });
  },

  // Delete section
  deleteSection: async (id) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM accordion_sections WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results.affectedRows > 0);
      });
    });
  },

  // Get user preferences
  getUserPreferences: async (userId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM accordion_preferences WHERE user_id = ?';
      db.query(query, [userId], (err, results) => {
        if (err) reject(err);
        else resolve(results[0] || null);
      });
    });
  },

  // Save or update user preferences
  saveUserPreferences: async (userId, openItems, theme, expandedByDefault) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO accordion_preferences (user_id, open_items, theme, expanded_by_default, updated_at)
        VALUES (?, ?, ?, ?, NOW())
        ON DUPLICATE KEY UPDATE 
          open_items = VALUES(open_items),
          theme = VALUES(theme),
          expanded_by_default = VALUES(expanded_by_default),
          updated_at = NOW()
      `;
      db.query(query, [userId, JSON.stringify(openItems), theme, expandedByDefault], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
};

module.exports = AccordionModel;
