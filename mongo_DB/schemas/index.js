const mongoose = require('mongoose');

const connect = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true); // 개발 환경에서 쿼리 디버깅
    }

    await mongoose.connect('mongodb://asdf:qwer@localhost:27017/admin', {
      dbName: 'nodejs', // 실제 사용할 데이터베이스
      useNewUrlParser: true, // 새 파서 사용
      useUnifiedTopology: true, // 서버 탐색 및 모니터링 엔진 사용
      autoIndex: true, // 개발 환경에서는 자동 인덱스 생성 허용
    });

    console.log('몽고디비 연결 성공');
  } catch (error) {
    console.error('몽고디비 연결 에러', error);
    process.exit(1); // 연결 실패 시 서버 강제 종료
  }
};

// 몽고디비 연결 끊김 이벤트 처리
mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});

mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결 끊김. 연결을 재시도합니다...');
  connect(); // 연결 재시도
});

module.exports = connect;
