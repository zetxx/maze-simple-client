const Sequelize = require('sequelize')
const db = require('../../config/db')

const products = db.define('products', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  barcode: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  articleNum: {
    type: Sequelize.STRING,
    allowNull: true
  },
  category: {
    type: Sequelize.INTEGER,
    references: {
      model: 'productCategories',
      key: 'id'
    }
  },
  supplier: {
    type: Sequelize.INTEGER,
    references: {
      model: 'suppliers',
      key: 'id'
    }
  },
  quantityTypeId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'quantityTypes',
      key: 'id'
    },
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0.00
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
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

module.exports = products
