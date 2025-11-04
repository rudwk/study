import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  connectionLimit: 5
});

export const initDB = async () => {
  try {
    await pool.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DB}\``);
    await pool.query(`USE \`${process.env.MYSQL_DB}\``);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        discord_id VARCHAR(50) UNIQUE NOT NULL,
        balance DECIMAL(15,2) DEFAULT ${process.env.STARTING_BALANCE || 100000},
        last_attendance DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS holdings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        symbol VARCHAR(10) NOT NULL,
        quantity INT NOT NULL,
        avg_price DECIMAL(15,2) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        symbol VARCHAR(10) NOT NULL,
        type ENUM('BUY','SELL') NOT NULL,
        price DECIMAL(15,2) NOT NULL,
        quantity INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS attendance (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        date DATE NOT NULL,
        reward DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log("✅ Database & tables ready!");
  } catch (err) {
    console.error("❌ DB init error:", err);
  }
};

export const query = async (sql, params) => {
  const [rows] = await pool.query(sql, params);
  return rows;
};
