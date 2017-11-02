const Sequelize = require('sequelize')
const db = require('../../config/db')

const userPriceRuleGroup = db.define('priceRuleGroupBinding', {
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
  priceRuleGroupId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'priceRuleGroup',
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

module.exports = userPriceRuleGroup
