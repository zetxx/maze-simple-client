const Sequelize = require('sequelize')
const db = require('../../config/db')

const transactions = db.define('currencyRates', {
  currency: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  rate: {
    type: Sequelize.DOUBLE(15, 11),
    allowNull: false
  },
  addedAt: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = transactions
