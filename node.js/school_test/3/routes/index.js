const express = require('express');
const { Employee, Department } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const employees = await Employee.findAll({
      include: [{
        model: Department,
        attributes: ['dept_name']
      }],
      order: [['emp_no', 'ASC']]
    });
    
    const departments = await Department.findAll({
      order: [['dept_no', 'ASC']]
    });
    
    res.render('index', { employees, departments });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;