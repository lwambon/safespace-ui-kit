const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Support both DATABASE_URL and individual connection params
const connectionConfig = process.env.DATABASE_URL 
  ? { connectionString: process.env.DATABASE_URL, ssl: false }
  : {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'safespace',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD,
      ssl: false
    };

const pool = new Pool(connectionConfig);

pool.on('error', (err) => {
  console.error('Unexpected DB error', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};