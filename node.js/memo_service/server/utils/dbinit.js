const pool = require('../config/db');

// 데이터베이스 초기화 함수
async function initializeDatabase() {
  const connection = await pool.getConnection();
  try {
    // 사용자 테이블 생성
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 메모 테이블 생성
    await connection.query(`
      CREATE TABLE IF NOT EXISTS memos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(100) NOT NULL,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('데이터베이스 테이블이 성공적으로 초기화되었습니다.');
  } catch (err) {
    console.error('데이터베이스 초기화 오류:', err);
  } finally {
    connection.release();
  }
}

module.exports = { initializeDatabase };