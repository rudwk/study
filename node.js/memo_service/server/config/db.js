const mysql = require('mysql2/promise');

// MySQL 연결 풀 생성
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'user', // 실제 비밀번호로 변경하세요
  database: 'memo_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;