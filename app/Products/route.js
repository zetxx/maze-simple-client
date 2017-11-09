const Joi = require('joi')
const preHandlers = require('../preHandlers')
const product = require('./model.js')
const quantityType = require('../QuantityType/model')
const productCategories = require('../ProductCat/model')
const files = require('../Files/model')
// const userPriceRule = require('../UserPriceRule/model')
const backendHelpers = require('../backendHelpers')

product.belongsTo(quantityType, {foreignKey: 'quantityTypeId'})
product.belongsTo(productCategories, {foreignKey: 'category'})
product.hasMany(files, {foreignKey: 'itemId'})

// var token____ = '52f9d1362bb6080cd9db1cce60a6c4f3e1c9b47fe2d8ee71695b343ea4785bba'

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/products/{token}',
    config: {
      pre: [{
        assign: 'user',
        method: preHandlers.tokenCheck
      }],
      handler: function (req, resp) {
        var priceRules = (req.pre.user.priceRuleGroups || []).reduce((a, c) => {
          return a.concat(c.priceRules)
        }, [])

        var pc = backendHelpers.priceCalc(priceRules)

        product.findAll({
          attributes: ['id', 'name', 'price'],
          include: [{
            model: quantityType
          }, {
            model: productCategories
          }, {
            model: files,
            required: false,
            where: {itemType: 'product'}
          }],
          where: {enabled: 1}
        })
          .then((r) => (r.map((item) => {
            return Object.assign(item, {price: pc(item.price)})
          })))
          .then(resp)
          .catch((e) => {
            console.error(e)
            resp(e)
          })
      },
      description: 'Product list',
      notes: 'Product list',
      tags: ['api', 'product', 'list'],
      validate: {
        payload: {},
        params: {
          token: Joi.string().min(10).required().description('crypto token')
        }
      }
    }
  })
}
