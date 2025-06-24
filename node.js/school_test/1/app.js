const express = require("express");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");

const { sequelize } = require("./models");
const { nextTick } = require("process");

const app = express();
app.set("port", process.env.port  || 3000);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true
});
sequelize.sync({force: false})
  .then(() => {console.log("DB 연결 성공")})
  .catch((err) => {console.log(err)})

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
  const error = new Error (`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
})

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV != 'production' ? err: {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log("server started in localhost:" + app.get('port'));
})