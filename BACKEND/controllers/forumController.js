/**
 * Forum Controller
 * ----------------
 * Handles forum posts and replies management
 */

const db = require('../db/connection');

/**
 * Get all forum posts
 */
const getPosts = async (req, res) => {
  try {
    const { limit = 20, offset = 0 } = req.query;
    const result = await db.query(
      `SELECT * FROM forum_posts 
       ORDER BY created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

/**
 * Get a single forum post
 */
const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `SELECT * FROM forum_posts WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

/**
 * Create a new forum post
 */
const createPost = async (req, res) => {
  try {
    const { title, body, is_anonymous } = req.body;
    const userId = req.user?.id || null;

    if (!title || !body) {
      return res.status(400).json({ error: 'Title and body are required' });
    }

    const result = await db.query(
      `INSERT INTO forum_posts (user_id, title, body, is_anonymous)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, title, body, is_anonymous !== false]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

/**
 * Update a forum post
 */
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, is_anonymous } = req.body;

    const result = await db.query(
      `UPDATE forum_posts 
       SET title = COALESCE($1, title), 
           body = COALESCE($2, body),
           is_anonymous = COALESCE($3, is_anonymous),
           updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [title, body, is_anonymous, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update post' });
  }
};

/**
 * Delete a forum post
 */
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `DELETE FROM forum_posts WHERE id = $1 RETURNING id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

/**
 * Lock a forum post (prevent replies)
 */
const lockPost = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `UPDATE forum_posts 
       SET is_locked = true
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to lock post' });
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  lockPost,
};