const Sequelize = require('sequelize');

class Employee extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      emp_no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING(14),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(16),
        allowNull: false,
      },
      dept_no: {
        type: Sequelize.STRING(4),
        allowNull: false,
      },
      salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hire_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Employee',
      tableName: 'employees',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  
  static associate(db) {
    db.Employee.belongsTo(db.Department, { 
      foreignKey: 'dept_no', 
      targetKey: 'dept_no' 
    });
  }
}

module.exports = Employee;