const Sequelize = require('sequelize');

class Department extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      dept_no: {
        type: Sequelize.STRING(4),
        primaryKey: true,
        allowNull: false,
      },
      dept_name: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Department',
      tableName: 'departments',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  
  static associate(db) {
    db.Department.hasMany(db.Employee, { 
      foreignKey: 'dept_no', 
      sourceKey: 'dept_no' 
    });
  }
}

module.exports = Department;