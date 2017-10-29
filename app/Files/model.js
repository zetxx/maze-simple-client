const Sequelize = require('sequelize')
const db = require('../../config/db')

const files = db.define('files', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  itemId: { // productId or supplierId
    type: Sequelize.INTEGER
  },
  itemType: {
    type: Sequelize.ENUM('product', 'supplier'),
    allowNull: false
  },
  isDefault: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  contentType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  addedAt: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = files
