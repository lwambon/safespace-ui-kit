/**
 * Reply Model
 * -----------
 * Handles replies to forum posts:
 * - Create reply
 * - Get replies for a post
 */

const db = require('../db/connection');

const createReply = async ({ postId, userId, body, isAnonymous }) => {
  const result = await db.query(
    `INSERT INTO forum_replies (post_id, user_id, body, is_anonymous)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [postId, userId, body, isAnonymous]
  );
  return result.rows[0];
};

const getRepliesByPost = async (postId) => {
  const result = await db.query(
    `SELECT * FROM forum_replies WHERE post_id = $1 ORDER BY created_at ASC`,
    [postId]
  );
  return result.rows;
};

module.exports = { createReply, getRepliesByPost };