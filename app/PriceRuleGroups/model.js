const Sequelize = require('sequelize')
const db = require('../../config/db')

const userPriceRuleGroup = db.define('priceRuleGroup', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  simpleSum: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  enabled: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  addedAt: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = userPriceRuleGroup
