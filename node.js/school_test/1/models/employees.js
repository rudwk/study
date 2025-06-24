const Sequelize = require('sequelize');

class employees extends Sequelize.Model {
  static initiate(sequelize) {
    employees.init({
      P_NO: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      NAME: {
        type: Sequelize.STRING(40),
        allowNull: false
      },
      SALARY: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    })
  }
}