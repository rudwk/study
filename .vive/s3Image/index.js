require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// S3 클라이언트 초기화
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// multer 설정 (로컬 임시 저장)
const upload = multer({ dest: 'uploads/' });

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 파일 업로드 라우터
app.post('/upload', upload.single('file'), async (req, res) => {
  const fileContent = fs.readFileSync(req.file.path);
  const fileName = `${Date.now()}_${req.file.originalname}`;

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${fileName}`,
    Body: fileContent,
    ContentType: req.file.mimetype,
    ACL: 'public-read',
  };

  try {
    await s3.send(new PutObjectCommand(uploadParams));
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;
    fs.unlinkSync(req.file.path); // 임시파일 삭제

    res.json({
      message: '✅ 업로드 성공',
      fileUrl: fileUrl,
    });
  } catch (err) {
    console.error('S3 업로드 실패:', err);
    res.status(500).json({ message: '업로드 실패', error: err });
  }
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
