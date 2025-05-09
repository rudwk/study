const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: DB_HOST,
  user: process.env.DB_NAME,
  password: DB_PW,
  database: 'temp',
  waitForConnections: true
});

const getUser = async() => {
  const promissPool = pool.promise();
  const [rows] = await promissPool.query('select * from users;');
  console.log(rows);
  return rows;
}

module.exports = {getUser};