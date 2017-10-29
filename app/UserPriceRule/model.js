const Sequelize = require('sequelize')
const db = require('../../config/db')

const userPriceRule = db.define('userPriceRule', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  priceRuleId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'priceRules',
      key: 'id'
    },
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
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

module.exports = userPriceRule
