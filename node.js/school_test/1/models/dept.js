const Sequelize = require('sequelize');

class DEPT extends Sequelize.Model {
  static initiate(sequelize) {
    DEPT.init({
      DETP_NO: {
        type: Sequelize.CHAR(4),
        allowNull: false,
        primaryKey: true
      },
      DEPT_NAME: {
        type: Sequelize.STRING(40),
        allowNull: false
      },
      CELL_NO: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      CHECK: {
        type: Sequelize.TINYINT,
        allowNull: false
      }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'dept',
      tableName: 'dept',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  }

  static associate(db){}
}

module.exports = DEPT;