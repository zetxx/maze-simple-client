const Sequelize = require('sequelize')
const db = require('../../config/db')

const repositories = db.define('repositories',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    productId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    shopId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'shops',
        key: 'id'
      }
    },
    quantity: {
      type: Sequelize.FLOAT.UNSIGNED,
      allowNull: false,
      defaultValue: 0.00
    },
    addedAt: {
      type: Sequelize.DATE,
      defaultValue: new Date()
    }
  }, {
    indexes: [{
      unique: true,
      fields: ['productId', 'shopId']
    }],
    timestamps: false,
    freezeTableName: true
  }
)

module.exports = repositories
