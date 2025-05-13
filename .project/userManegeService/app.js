const express = require('express');
const app = express();
const userService = require('./routers/userServiceRouter');

app.use(express.json());
app.use(express.static("static"));
const port = 8888;

app.use('/user', userService);

app.get('/findPw', (req, res) => {
  const id = req.body.id;

  if(!id) return res.status(400).json({message: "아이디를 입력하여 주십시오"});

  const sql = `SELECT * FROM users WHERE id == ${id}`
  db.query(sql, (err) => {
    if(err) console.log('dbError: ' + err);
  })
});

app.listen(port, () => {
  console.log('server is running in localhost:'+port);
});