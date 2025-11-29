const db = require('./db/connection');

async function verify() {
  try {
    // Check if reports table exists and has data
    const result = await db.query('SELECT COUNT(*) FROM reports');
    console.log('✅ Reports table exists with', result.rows[0].count, 'records');
    
    // Check moderators table
    const modResult = await db.query('SELECT COUNT(*) FROM moderators');
    console.log('✅ Moderators table exists with', modResult.rows[0].count, 'records');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

verify();
