const Sequelize = require('sequelize')
const db = require('../../config/db')

const UserPriceRuleGroup = db.define('userPriceRuleGroup', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  priceRuleGroupId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'priceRuleGroup',
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

module.exports = UserPriceRuleGroup
