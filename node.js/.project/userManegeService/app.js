const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());
app.use(express.static("static"));
const port = 8888;

const db = mysql.createConnection({
  host: 'localhost',
  database: 'asdf',
  user: 'root',
  password: 'user'
});

db.connect((err) => {
  if(err) console.log('db 연결 실패');
  else console.log('db 연결 성공');
});

app.post('/DBinput', (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;
    if(!id|| !pw) return res.status(400).json({message: "비밀번호와 아이디를 입력하여 주십시오"});
  console.log(`id: ${id}\npw: ${pw}`);
  const sql = `INSERT INTO users (id, pw) VALUES ("${id}", "${pw}")`;
  db.query(sql, (err) => {
    if(err) console.log("db Error: " + err);
  });
  // console.log("여기까진 ok");

  res.status(200).json({message: "db에 값이 성공적으로 입력되었습니다."});
});

app.get('/findPw', (req, res) => {
  const id = req.body.id;

  if(!id) return res.status(400).json({message: "아이디를 입력하여 주십시오"});

  const sql = `SELECT * FROM users WHERE id == ${id}`
  db.query(sql, (err) => {
    if(err) console.log('dbError: ' + err);
  })
});
cd 
app.listen(port, () => {
  console.log('server is running in localhost:'+port);
});