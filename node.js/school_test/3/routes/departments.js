const express = require('express');
const { Department, Employee } = require('../models');

const router = express.Router();

// 모든 부서 조회
router.get('/', async (req, res, next) => {
  try {
    const departments = await Department.findAll({
      order: [['dept_no', 'ASC']]
    });
    res.json(departments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 새 부서 생성
router.post('/', async (req, res, next) => {
  try {
    const department = await Department.create({
      dept_no: req.body.dept_no,
      dept_name: req.body.dept_name,
    });
    console.log('새 부서 생성:', department);
    res.status(201).json(department);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 특정 부서의 사원들 조회
router.get('/:dept_no/employees', async (req, res, next) => {
  try {
    const employees = await Employee.findAll({
      include: [{
        model: Department,
        where: { dept_no: req.params.dept_no },
      }],
      order: [['emp_no', 'ASC']]
    });
    console.log('부서별 사원 조회:', employees);
    res.json(employees);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 부서 정보 수정
router.put('/:dept_no', async (req, res, next) => {
  try {
    const result = await Department.update({
      dept_name: req.body.dept_name
    }, {
      where: { dept_no: req.params.dept_no }
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 부서 삭제
router.delete('/:dept_no', async (req, res, next) => {
  try {
    const result = await Department.destroy({
      where: { dept_no: req.params.dept_no }
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;