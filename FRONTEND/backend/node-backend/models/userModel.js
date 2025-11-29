/**
 * User Model
 * ----------
 * Handles database operations related to users:
 * - Register new user
 * - Find user by email
 */

const db = require('../db/connection');

const createUser = async ({ email, phone, handle, passwordHash, pinHash }) => {
  const result = await db.query(
    `INSERT INTO users (email, phone, handle, password_hash, pin_hash, is_anonymous)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, email, handle, created_at`,
    [email, phone, handle, passwordHash, pinHash, true]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail };