const Joi = require('joi')
const session = require('../session')
const Boom = require('boom')
const product = require('./model.js')
const quantityType = require('../QuantityType/model')
const productCategories = require('../ProductCat/model')
const files = require('../Files/model')
const users = require('../Users/model')
const priceRules = require('../PriceRules/model')
const userPriceRule = require('../UserPriceRule/model')
const backendHelpers = require('../backendHelpers')

product.belongsTo(quantityType, {foreignKey: 'quantityTypeId'})
product.belongsTo(productCategories, {foreignKey: 'category'})
product.hasMany(files, {foreignKey: 'itemId'})
users.belongsToMany(priceRules, {through: userPriceRule})
priceRules.belongsToMany(users, {through: userPriceRule})
// var token____ = '52f9d1362bb6080cd9db1cce60a6c4f3e1c9b47fe2d8ee71695b343ea4785bba'

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/products/{token}',
    config: {
      pre: [{
        assign: 'user',
        method: (request, reply) => {
          session
            .check(request.params.token)
            .then((r) => {
              return users
                .find({
                  attributes: ['id', 'userName', 'email', 'shopId'],
                  include: [{
                    model: priceRules
                  }]
                }, {where: {id: r.id}})
                .then((r) => {
                  return r.toJSON()
                })
            })
            .then(reply)
            .catch(() => {
              return reply(Boom.unauthorized('invalid session'))
            })
        }
      }],
      handler: function (req, resp) {
        var pc = backendHelpers.priceCalc(req.pre.user.priceRules)

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
          }]
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
