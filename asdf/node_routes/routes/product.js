const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.send('상품 정보 조회');
});

router.post('/insert', function(req, res) {
    res.send('신규 상품 추가');
});

router.put('/update', function(req, res) {
    res.send('상품 정보 수정');
});

router.delete('/delete', function(req, res) {
    res.send('상품 정보 삭제');
});

module.exports = router;