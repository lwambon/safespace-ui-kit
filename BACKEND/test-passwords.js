const { Pool } = require('pg');

// Try different connection strings
const connectionStrings = [
  'postgres://postgres@localhost:5432/safespace',  // no password
  'postgres://postgres:@localhost:5432/safespace',  // empty password
  'postgres://postgres:password@localhost:5432/safespace',  // common default
  'postgres://postgres:group28@localhost:5432/safespace',  // current in .env
];

async function testConnections() {
  for (const connStr of connectionStrings) {
    const pool = new Pool({
      connectionString: connStr,
      ssl: false,
      connect_timeout: 5
    });

    try {
      console.log(`\n🔄 Trying: ${connStr.replace(/:.*@/, ':****@')}`);
      const result = await pool.query('SELECT NOW()');
      console.log('✅ SUCCESS! Connection works!');
      console.log('   Time:', result.rows[0].now);
      await pool.end();
      return connStr;
    } catch (err) {
      console.log(`❌ Failed: ${err.message.split('\n')[0]}`);
      await pool.end();
    }
  }
  console.log('\n⚠️  No connection strings worked.');
}

testConnections();
