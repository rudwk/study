const express = require('express');
const router = express.Router();
const db = require('../db');

// 사원 등록
router.post('/', (req, res) => {
  const { dept_no, name, salary } = req.body;
  const sql = `INSERT INTO EMPLOYEE (DEPT_NO, NAME, SALARY) VALUES (?, ?, ?)`;
  db.query(sql, [dept_no, name, salary], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: '사원 등록 성공' });
  });
});

// 사원 조회
router.get('/', (req, res) => {
  db.query('SELECT * FROM EMPLOYEE', (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

// 사원 삭제
router.delete('/:p_no', (req, res) => {
  const pNo = req.params.p_no;
  db.query('DELETE FROM EMPLOYEE WHERE P_NO = ?', [pNo], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: '사원 삭제 완료' });
  });
});

module.exports = router;