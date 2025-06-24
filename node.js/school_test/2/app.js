const express = require('express');
const app = express();
const departments = require('./router/departments');
const employees = require('./router/employees');
require('dotenv').config();

app.use(express.json());
app.use(express.static('./public'));

app.set('port', process.env.PORT || 3001)
app.set('view engine', 'html')

app.use('/departments', departments);
app.use('/employees', employees);
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.sendFile('./public/index.html');
})

app.listen(app.get('port'), () => {
  console.log(`서버 실행 중... 포트: ${app.get('port')}`);
});