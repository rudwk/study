const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const connect = require('./schemas'); // 수정된 connect 가져오기

const app = express();

// 포트 설정
app.set('port', process.env.PORT || 3002);

// 뷰 엔진 설정
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: process.env.NODE_ENV !== 'production', // 개발 환경일 때만 템플릿 변경 감지
});

// 몽고디비 연결
connect();

// 미들웨어 설정
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 라우터가 없을 때 404 에러 처리
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 에러 핸들러
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// 서버 실행
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 서버 대기 중');
});``````