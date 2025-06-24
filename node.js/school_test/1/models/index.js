const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || 'development';
const config = require("../config/config.json")[env];
const db = {}

const sequelize = new Sequelize(config.development, config.username, config.development, config);
db.sequelize = sequelize;

module.exports = db;