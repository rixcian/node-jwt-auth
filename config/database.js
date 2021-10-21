const { Sequelize } = require('sequelize');

// Connection to database
const sequelize = new Sequelize('bankless', 'postgres', 'Kroker002', {
  host: 'localhost',
  dialect: 'postgres' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

module.exports = sequelize;