const { Pool } = require('pg');

const pool = new Pool({
  user: 'default',
  host: 'ep-gentle-mountain-a4xo8dza.us-east-1.aws.neon.tech',
  database: 'verceldb',
  password: 'hgurq7HFL5Ta',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;