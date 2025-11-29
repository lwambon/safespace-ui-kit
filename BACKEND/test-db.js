const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

async function test() {
  try {
    console.log('🔍 Testing connection to:', process.env.DATABASE_URL);
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Connected successfully!');
    console.log('🕐 Current time:', result.rows[0].now);
    
    // Check if reports table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS(
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'reports'
      )
    `);
    
    if (tableCheck.rows[0].exists) {
      console.log('✅ Reports table exists');
      const count = await pool.query('SELECT COUNT(*) FROM reports');
      console.log('   Records:', count.rows[0].count);
    } else {
      console.log('❌ Reports table does NOT exist');
      console.log('   Run: npm run schema:moderation');
    }
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Connection failed!');
    console.error('Error:', err.message);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure PostgreSQL is running');
    console.error('2. Check if database "safespace" exists');
    console.error('3. Verify credentials in .env file');
    process.exit(1);
  }
}

test();
