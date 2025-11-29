/**
 * Reply Controller
 * ----------------
 * Handles forum post replies
 */

const db = require('../db/connection');

/**
 * Get all replies for a post
 */
const getReplies = async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await db.query(
      `SELECT * FROM forum_replies 
       WHERE post_id = $1 
       ORDER BY created_at ASC`,
      [postId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch replies' });
  }
};

/**
 * Create a new reply
 */
const createReply = async (req, res) => {
  try {
    const { postId } = req.params;
    const { body, is_anonymous } = req.body;
    const userId = req.user?.id || null;

    if (!body) {
      return res.status(400).json({ error: 'Body is required' });
    }

    // Check if post exists
    const postCheck = await db.query(
      'SELECT id FROM forum_posts WHERE id = $1',
      [postId]
    );

    if (postCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const result = await db.query(
      `INSERT INTO forum_replies (post_id, user_id, body, is_anonymous)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [postId, userId, body, is_anonymous !== false]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create reply' });
  }
};

/**
 * Update a reply
 */
const updateReply = async (req, res) => {
  try {
    const { postId, replyId } = req.params;
    const { body } = req.body;

    const result = await db.query(
      `UPDATE forum_replies 
       SET body = COALESCE($1, body),
           updated_at = NOW()
       WHERE id = $2 AND post_id = $3
       RETURNING *`,
      [body, replyId, postId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reply not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update reply' });
  }
};

/**
 * Delete a reply
 */
const deleteReply = async (req, res) => {
  try {
    const { postId, replyId } = req.params;

    const result = await db.query(
      `DELETE FROM forum_replies 
       WHERE id = $1 AND post_id = $2
       RETURNING id`,
      [replyId, postId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reply not found' });
    }

    res.json({ message: 'Reply deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete reply' });
  }
};

module.exports = {
  getReplies,
  createReply,
  updateReply,
  deleteReply,
};