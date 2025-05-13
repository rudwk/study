const express = require('express');
const router = express.Router();

router
.get('/', (req, res)=>{
    res.send('전제 고객정보 조회');
    console.log('asdf');
})
.post('/', (req, res) => {
    res.send('고객 추가');
})
.put('/', (req, res)=>{
    res.send('고객정보 수정');
})
.delete('/', (req, res) => {
    res.send("고객 삭제")
});

module.exports = router;