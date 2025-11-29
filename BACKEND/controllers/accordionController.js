const db = require('../db/connection');

const AccordionController = {
  // Get all accordion sections
  getAllSections: (req, res) => {
    const query = 'SELECT * FROM accordion_sections ORDER BY display_order ASC';
    
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ 
          error: 'Failed to fetch accordion sections',
          details: err.message 
        });
      }
      
      res.status(200).json({
        success: true,
        data: results,
        count: results.length
      });
    });
  },

  // Get accordion section by ID
  getSectionById: (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM accordion_sections WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ 
          error: 'Failed to fetch accordion section',
          details: err.message 
        });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ 
          error: 'Accordion section not found' 
        });
      }
      
      res.status(200).json({
        success: true,
        data: results[0]
      });
    });
  },

  // Create new accordion section
  createSection: (req, res) => {
    const { title, content, display_order, is_active, category } = req.body;
    
    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({ 
        error: 'Title and content are required' 
      });
    }
    
    const query = `
      INSERT INTO accordion_sections (title, content, display_order, is_active, category, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `;
    
    db.query(query, [title, content, display_order || 0, is_active !== false, category || 'general'], (err, results) => {
      if (err) {
        return res.status(500).json({ 
          error: 'Failed to create accordion section',
          details: err.message 
        });
      }
      
      res.status(201).json({
        success: true,
        message: 'Accordion section created successfully',
        id: results.insertId
      });
    });
  },

  // Update accordion section
  updateSection: (req, res) => {
    const { id } = req.params;
    const { title, content, display_order, is_active, category } = req.body;
    
    const query = `
      UPDATE accordion_sections 
      SET title = ?, content = ?, display_order = ?, is_active = ?, category = ?, updated_at = NOW()
      WHERE id = ?
    `;
    
    db.query(query, [title, content, display_order, is_active, category, id], (err, results) => {
      if (err) {
        return res.status(500).json({ 
          error: 'Failed to update accordion section',
          details: err.message 
        });
      }
      
      if (results.affectedRows === 0) {
        return res.status(404).json({ 
          error: 'Accordion section not found' 
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Accordion section updated successfully'
      });
    });
  },

  // Delete accordion section
  deleteSection: (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM accordion_sections WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ 
          error: 'Failed to delete accordion section',
          details: err.message 
        });
      }
      
      if (results.affectedRows === 0) {
        return res.status(404).json({ 
          error: 'Accordion section not found' 
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Accordion section deleted successfully'
      });
    });
  },

  // Get user accordion preferences (which items are open, theme, etc.)
  getUserPreferences: (req, res) => {
    const { userId } = req.params;
    const query = 'SELECT * FROM accordion_preferences WHERE user_id = ?';
    
    db.query(query, [userId], (err, results) => {
      if (err) {
        return res.status(500).json({ 
          error: 'Failed to fetch user preferences',
          details: err.message 
        });
      }
      
      res.status(200).json({
        success: true,
        data: results.length > 0 ? results[0] : {
          open_items: [],
          theme: 'light',
          expanded_by_default: false
        }
      });
    });
  },

  // Save user accordion preferences
  saveUserPreferences: (req, res) => {
    const { userId } = req.params;
    const { open_items, theme, expanded_by_default } = req.body;
    
    const query = `
      INSERT INTO accordion_preferences (user_id, open_items, theme, expanded_by_default, updated_at)
      VALUES (?, ?, ?, ?, NOW())
      ON DUPLICATE KEY UPDATE 
        open_items = VALUES(open_items),
        theme = VALUES(theme),
        expanded_by_default = VALUES(expanded_by_default),
        updated_at = NOW()
    `;
    
    db.query(query, [userId, JSON.stringify(open_items), theme, expanded_by_default], (err) => {
      if (err) {
        return res.status(500).json({ 
          error: 'Failed to save preferences',
          details: err.message 
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'User preferences saved successfully'
      });
    });
  }
};

module.exports = AccordionController;
