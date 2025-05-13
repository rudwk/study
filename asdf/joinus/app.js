const express = require('express');
const cors = require("cors");
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

const app = express();
const port = 8888;

const db = mysql.createConnection({
    host: 'pcall.kr',
    user: 'chatting',
    password: 'coxld1234',
    database:'chatting'
});

db.connect((err) => {
    if(err) console.log('connect fail');
    else console.log('connected!!');
});

app.use(express.json());
app.use(cors());
app.use(express.static('static'));

app.post('/register', async (req, res) => {
    const {id, pw} = req.body;

    if(!id || !pw){
        return res.status(400).json({message: "id와 password를 입력하시오"});
    }

    try{
        const hashPW = await bcrypt.hash(pw, 10);
        const sql = `INSERT INTO account (id, pw) VLAUES (?,?)`;

        db.query(sql, [id, hashPW], (err, result) => {
            if(err) return res.status(500).json({message: 'sign up error'});
        });
    }catch(err){
        console.log('암호화 오류: ', err);
        res.status(500).json({message: '서버 암호화 오류'});
    }
})

app.listen(port, ()=> {
    console.log('server is running in localhost:', port);
})