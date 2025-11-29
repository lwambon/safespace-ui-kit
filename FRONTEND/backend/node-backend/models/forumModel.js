/**
 * Forum Model
 * -----------
 * Handles forum posts:
 * - Create new post
 * - Get all posts
 */

const db = require('../db/connection');

const createPost = async ({ userId, title, body, isAnonymous }) => {
  const result = await db.query(
    `INSERT INTO forum_posts (user_id, title, body, is_anonymous)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [userId, title, body, isAnonymous]
  );
  return result.rows[0];
};

const getPosts = async () => {
  const result = await db.query(`SELECT * FROM forum_posts ORDER BY created_at DESC`);
  return result.rows;
};

module.exports = { createPost, getPosts };