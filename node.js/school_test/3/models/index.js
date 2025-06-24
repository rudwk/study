const Sequelize = require('sequelize');
const Department = require('./department');
const Employee = require('./employee');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Department = Department;
db.Employee = Employee;

Department.init(sequelize);
Employee.init(sequelize);

Department.associate(db);
Employee.associate(db);

module.exports = db;