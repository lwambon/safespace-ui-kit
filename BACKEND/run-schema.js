const fs = require('fs');
const path = require('path');
const { pool } = require('./db/connection');

async function runSchema(schemaFile) {
  try {
    const schemaPath = path.join(__dirname, 'db', schemaFile);
    const sql = fs.readFileSync(schemaPath, 'utf8');

    console.log(`📋 Running ${schemaFile}...`);
    
    // Split by semicolon and filter empty statements
    const statements = sql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    for (const statement of statements) {
      try {
        await pool.query(statement);
        console.log('✅ Statement executed successfully');
      } catch (error) {
        console.error('❌ Error executing statement:', error.message);
      }
    }

    console.log(`\n✨ ${schemaFile} completed!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error reading file:', error.message);
    process.exit(1);
  }
}

// Run the script
const schemaFile = process.argv[2] || 'moderation_schema.sql';
runSchema(schemaFile);
