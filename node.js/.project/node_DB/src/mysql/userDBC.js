const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'user',
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