const Joi = require('joi')
const preHandlers = require('../preHandlers')
const product = require('./model.js')
const quantityType = require('../QuantityType/model')
const productCategories = require('../ProductCat/model')
const files = require('../Files/model')
const backendHelpers = require('../backendHelpers')

product.belongsTo(quantityType, {foreignKey: 'quantityTypeId'})
product.belongsTo(productCategories, {foreignKey: 'category'})
product.hasMany(files, {foreignKey: 'itemId'})

// var token____ = '52f9d1362bb6080cd9db1cce60a6c4f3e1c9b47fe2d8ee71695b343ea4785bba'

const handler = (req, resp) => {
  var priceRules = (req.pre.user.priceRuleGroups || []).reduce((a, c) => {
    return a.concat(c.priceRules)
  }, [])
  var currencyRate = {rate: req.pre.user.currencyRate.rate, currency: req.pre.user.currency}

  var pc = backendHelpers.priceCalc(priceRules)
  var productWhere = {enabled: 1}
  if (req.payload && req.payload.products) {
    productWhere.id = {in: req.payload.products}
  }

  product.findAll({
    attributes: ['id', 'name', 'price', 'articleNum'],
    include: [{
      model: quantityType
    }, {
      model: productCategories
    }, {
      model: files,
      required: false,
      where: {itemType: 'product'}
    }],
    order: [[{model: productCategories}, 'name', 'ASC'], ['name', 'ASC']],
    where: productWhere
  })
    .then((r) => (r.map((item) => {
      return Object.assign(item, {price: pc(item.price) * currencyRate.rate})
    })))
    .then((r) => {
      if (req.params && req.params.export) {
        var result = []
        if (r.length) {
          var intermediate = r.map(({dataValues}) => {
            delete dataValues.id
            delete dataValues.files
            delete dataValues.productCategory
            delete dataValues.quantityType
            return dataValues
          })
          var columns = Object.keys(intermediate[0])
          var dataCloumns = intermediate.map((obj) => {
            return columns.map((k) => obj[k]).join(';')
          })
          result = result.concat([columns.join(';')]).concat(dataCloumns)
        }
        return resp(result.join('\n'))
          .header('content-type', 'application/octet-stream')
          .header('Content-Disposition', 'attachment; filename="products.csv"')
      }
      return {products: r, currencyRate}
    })
    .then((r) => {
      return productCategories
        .findAll({where: {enabled: 1}})
        .then((pc) => {
          return Object.assign(r, {productCategories: pc.map((p) => (p.dataValues))})
        })
    })
    .then(resp)
    .catch((e) => {
      console.error(e)
      resp(e)
    })
}

module.exports = function(registrar) {
  registrar({
    method: 'GET',
    path: '/api/products/{token}',
    config: {
      pre: [{
        assign: 'user',
        method: preHandlers.tokenCheck
      }],
      handler,
      description: 'Product list',
      notes: 'Product list',
      tags: ['api', 'product', 'list'],
      validate: {
        params: {
          token: Joi.string().min(10).required().description('crypto token')
        }
      }
    }
  })

  registrar({
    method: 'GET',
    path: '/api/products/{export}/{token}',
    config: {
      pre: [{
        assign: 'user',
        method: preHandlers.tokenCheck
      }],
      handler,
      description: 'Product list',
      notes: 'Product list',
      tags: ['api', 'product', 'list'],
      validate: {
        params: {
          token: Joi.string().min(10).required().description('crypto token'),
          export: Joi.string().description('export result set')
        }
      }
    }
  })

  registrar({
    method: 'POST',
    path: '/api/products/{token}',
    config: {
      pre: [{
        assign: 'user',
        method: preHandlers.tokenCheck
      }],
      handler,
      description: 'Product basket list',
      notes: 'Product basket list',
      tags: ['api', 'product', 'basket', 'list'],
      validate: {
        payload: {
          products: Joi.array().items(Joi.number()).required().description('product list')
        },
        params: {
          token: Joi.string().min(10).required().description('crypto token')
        }
      }
    }
  })
}
