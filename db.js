const { Pool, types } = require('pg');
require('dotenv').config();

// BIGINT(int8)는 pg에서 기본적으로 문자열로 오므로, 응답에서 number로 쓰기 위해 int로 파싱한다.
types.setTypeParser(20, (val) => (val === null ? null : parseInt(val, 10)));

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  // ssl: { rejectUnauthorized: false },
});

module.exports = pool;
