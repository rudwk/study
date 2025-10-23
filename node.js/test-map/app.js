require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;
const API_KEY = process.env.GOOGLE_API_KEY;

// public 폴더 정적 파일 서빙
app.use(express.static(path.join(__dirname, "public")));

// 클라이언트에서 API 키 요청 시 전달
app.get("/api/key", (req, res) => {
  res.json({ key: API_KEY });
});

// 장소 검색 API
app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.query || "신정호 카페";
    console.log(req.query)
    
    const response = await axios.get("https://maps.googleapis.com/maps/api/place/textsearch/json", {
      params: {
        query: query,
        key: API_KEY,
        language: "ko",
      },
    });
    console.log(response.data)
    res.json(response.data.results);
  } catch (error) {
    console.error("❌ 오류:", error.message);
    res.status(500).send("서버 오류 발생");
  }
});

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중 → http://localhost:${PORT}`);
});
