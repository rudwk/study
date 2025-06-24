const express = require('express');
const { Employee, Department } = require('../models');

const router = express.Router();

// 모든 사원 조회
router.get('/', async (req, res, next) => {
  try {
    const employees = await Employee.findAll({
      include: [{
        model: Department,
        attributes: ['dept_name']
      }],
      order: [['emp_no', 'ASC']]
    });
    res.json(employees);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 새 사원 등록
router.post('/', async (req, res, next) => {
  try {
    const employee = await Employee.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      dept_no: req.body.dept_no,
      salary: req.body.salary,
      hire_date: req.body.hire_date,
    });
    console.log('새 사원 등록:', employee);
    res.status(201).json(employee);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 특정 사원 조회
router.get('/:emp_no', async (req, res, next) => {
  try {
    const employee = await Employee.findOne({
      where: { emp_no: req.params.emp_no },
      include: [{
        model: Department,
        attributes: ['dept_name']
      }]
    });
    if (!employee) {
      return res.status(404).json({ message: '사원을 찾을 수 없습니다.' });
    }
    res.json(employee);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 사원 정보 수정
router.put('/:emp_no', async (req, res, next) => {
  try {
    const result = await Employee.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      dept_no: req.body.dept_no,
      salary: req.body.salary,
      hire_date: req.body.hire_date,
    }, {
      where: { emp_no: req.params.emp_no }
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 사원 삭제
router.delete('/:emp_no', async (req, res, next) => {
  try {
    const result = await Employee.destroy({
      where: { emp_no: req.params.emp_no }
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;