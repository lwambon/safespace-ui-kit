const db = require('../db/connection');

const ModeratorController = {
  // Get all moderators
  getAllModerators: async (req, res) => {
    try {
      const query = `
        SELECT id, user_id, name, status, reports_handled, last_active, created_at
        FROM moderators
        ORDER BY reports_handled DESC
      `;

      const result = await db.query(query);

      res.status(200).json({
        success: true,
        data: result.rows || []
      });
    } catch (err) {
      console.error('Error fetching moderators:', err);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch moderators',
        details: err.message
      });
    }
  },

  // Get moderator by ID
  getModeratorById: async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM moderators WHERE id = $1';

      const result = await db.query(query, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Moderator not found'
        });
      }

      res.status(200).json({
        success: true,
        data: result.rows[0]
      });
    } catch (err) {
      console.error('Error fetching moderator:', err);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch moderator',
        details: err.message
      });
    }
  },

  // Add new moderator (admin only)
  addModerator: async (req, res) => {
    try {
      const { user_id, name, status } = req.body;

      if (!user_id || !name) {
        return res.status(400).json({
          success: false,
          error: 'User ID and name are required'
        });
      }

      const query = `
        INSERT INTO moderators (user_id, name, status, reports_handled, created_at, updated_at)
        VALUES ($1, $2, $3, 0, NOW(), NOW())
        RETURNING id
      `;

      const result = await db.query(query, [user_id, name, status || 'offline']);

      res.status(201).json({
        success: true,
        message: 'Moderator added successfully',
        id: result.rows[0].id
      });
    } catch (err) {
      console.error('Error adding moderator:', err);
      res.status(500).json({
        success: false,
        error: 'Failed to add moderator',
        details: err.message
      });
    }
  },

  // Update moderator status
  updateModeratorStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({
          success: false,
          error: 'Status is required'
        });
      }

      const query = `
        UPDATE moderators
        SET status = $1, last_active = NOW(), updated_at = NOW()
        WHERE id = $2
        RETURNING id
      `;

      const result = await db.query(query, [status, id]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Moderator not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Moderator status updated successfully'
      });
    } catch (err) {
      console.error('Error updating moderator status:', err);
      res.status(500).json({
        success: false,
        error: 'Failed to update moderator status',
        details: err.message
      });
    }
  },

  // Increment reports handled
  incrementReportsHandled: async (req, res) => {
    try {
      const { id } = req.params;

      const query = `
        UPDATE moderators
        SET reports_handled = reports_handled + 1, updated_at = NOW()
        WHERE id = $1
        RETURNING id
      `;

      const result = await db.query(query, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Moderator not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Reports handled updated'
      });
    } catch (err) {
      console.error('Error updating reports handled:', err);
      res.status(500).json({
        success: false,
        error: 'Failed to update reports handled',
        details: err.message
      });
    }
  },

  // Remove moderator
  removeModerator: async (req, res) => {
    try {
      const { id } = req.params;

      const query = 'DELETE FROM moderators WHERE id = $1 RETURNING id';

      const result = await db.query(query, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Moderator not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Moderator removed successfully'
      });
    } catch (err) {
      console.error('Error removing moderator:', err);
      res.status(500).json({
        success: false,
        error: 'Failed to remove moderator',
        details: err.message
      });
    }
  },

  // Get moderator statistics
  getModeratorStats: async (req, res) => {
    try {
      const query = `
        SELECT
          COUNT(*)::int as total_moderators,
          SUM(CASE WHEN status = 'online' THEN 1 ELSE 0 END)::int as online,
          SUM(CASE WHEN status = 'away' THEN 1 ELSE 0 END)::int as away,
          SUM(CASE WHEN status = 'offline' THEN 1 ELSE 0 END)::int as offline,
          AVG(reports_handled)::float as avg_reports_handled,
          MAX(reports_handled)::int as max_reports_handled
        FROM moderators
      `;

      const result = await db.query(query);

      res.status(200).json({
        success: true,
        data: result.rows[0] || {}
      });
    } catch (err) {
      console.error('Error fetching statistics:', err);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch statistics',
        details: err.message
      });
    }
  }
};

module.exports = ModeratorController;
