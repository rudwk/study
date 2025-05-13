const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
router.post('/signup', (req, res) => {
  const {id, pw} = req.body;

    if(!id|| !pw) return res.status(400).json({message: "비밀번호 혹은 아이디를 입력하여 주십시오"});
  console.log(`signup request\nid: ${id}\npw: ${pw}`);

  const hash_pw = bcrypt.hashSync(pw, 10, (err)=>{console.error(err)});

  const sql = `INSERT INTO users (id, pw) VALUES (?, ?)`;

  db.query(sql, [id, hash_pw], (err) => {
    if(err) console.log("db Error: " + err);
  });

  res.status(200).json({message: "회원가입되었습니다."});
});

router.post('/signin', (req, res) => {
  const {id, pw} = req.body;

  if(!id||!pw) return res.status(400).json({message: "비밀번호 혹은 아이디를 입력하여 주십시오"});
  console.log(`signin request\nid: ${id}\npw: ${pw}`);

  const hash_pw = bcrypt.hashSync(pw, 10, (err) => {console.log('hashed Error: ' + err)});
  const sql = `SELECT * FROM users WHERE id = ? AND pw = ?`;
  db.query(sql, [id, hash_pw], (err, result) => {
    if(err) {
      console.log("db Error: " + err);
      return res.status(500).json({message: "DB Error"});
    }

    if(result.length == 0) return res.status(400).json({message: "아이디 혹은 비밀번호가 다릅니다."});



    res.status(200).json({message: "로그인되었습니다."});
  });
  
  const token = jwt.
});

module.exports = router;