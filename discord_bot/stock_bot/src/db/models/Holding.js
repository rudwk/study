const { pool } = require("../index");

async function getHoldings(userId) {
  const [rows] = await pool.query("SELECT * FROM holdings WHERE user_id = ?", [userId]);
  return rows;
}

async function addHolding(userId, stock, quantity, price) {
  const [exist] = await pool.query("SELECT * FROM holdings WHERE user_id=? AND stock=?", [userId, stock]);
  if (exist.length === 0) {
    await pool.query("INSERT INTO holdings (user_id, stock, quantity, avg_price) VALUES (?, ?, ?, ?)", [userId, stock, quantity, price]);
  } else {
    const totalQty = exist[0].quantity + quantity;
    const newAvg = (exist[0].avg_price * exist[0].quantity + price * quantity) / totalQty;
    await pool.query("UPDATE holdings SET quantity=?, avg_price=? WHERE id=?", [totalQty, newAvg, exist[0].id]);
  }
}

async function reduceHolding(userId, stock, quantity) {
  const [rows] = await pool.query("SELECT * FROM holdings WHERE user_id=? AND stock=?", [userId, stock]);
  if (rows.length === 0) return false;
  const remain = rows[0].quantity - quantity;
  if (remain <= 0) await pool.query("DELETE FROM holdings WHERE id=?", [rows[0].id]);
  else await pool.query("UPDATE holdings SET quantity=? WHERE id=?", [remain, rows[0].id]);
  return true;
}

module.exports = { getHoldings, addHolding, reduceHolding };
