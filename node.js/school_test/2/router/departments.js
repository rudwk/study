const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { dept_no, dept_name, cell_no, check } = req.body;
  const sql = `INSERT INTO DEPT (DEPT_NO, DEPT_NAME, CELL_NO, _CHECK) VALUES (?, ?, ?, ?)`;
  db.query(sql, [dept_no, dept_name, cell_no, check], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ message: '부서 등록 성공' });
  });
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM DEPT', (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

router.delete('/:dept_no', (req, res) => {
  const deptNo = req.params.dept_no;
  db.query('DELETE FROM DEPT WHERE DEPT_NO = ?', [deptNo], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: '부서 삭제 완료' });
  });
});

module.exports = router;