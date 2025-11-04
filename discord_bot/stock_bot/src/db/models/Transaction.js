const { pool } = require("../index");

async function addTransaction(userId, stock, type, quantity, price) {
  await pool.query(
    "INSERT INTO transactions (user_id, stock, type, quantity, price) VALUES (?, ?, ?, ?, ?)",
    [userId, stock, type, quantity, price]
  );
}

module.exports = { addTransaction };
