const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_DB
});

db.connect((err) => {
  if (err) {
    console.error('DB 연결 실패:', err);
  } else {
    console.log('DB 연결 성공');
  }
});

module.exports = db;