const Sequelize = require('sequelize')
const config = require('./server.js')
const sequelize = new Sequelize(config.db)

module.exports = sequelize
