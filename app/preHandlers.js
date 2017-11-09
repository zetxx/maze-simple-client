const session = require('./session')
const Boom = require('boom')
const users = require('./Users/model')
const UserPriceRuleGroup = require('./UserPriceRuleGroup/model')
const PriceRuleGroupBinding = require('./PriceRuleGroupBinding/model')
const PriceRuleGroup = require('./PriceRuleGroups/model')
const PriceRules = require('./PriceRules/model')

users.belongsToMany(PriceRuleGroup, {through: UserPriceRuleGroup})
PriceRuleGroup.belongsToMany(users, {through: UserPriceRuleGroup})

PriceRules.belongsToMany(PriceRuleGroup, {through: PriceRuleGroupBinding})
PriceRuleGroup.belongsToMany(PriceRules, {through: PriceRuleGroupBinding})

module.exports = {
  tokenCheck: (request, reply) => {
    session
      .check(request.params.token)
      .then((r) => {
        return users
          .find({
            attributes: ['id', 'userName', 'email', 'shopId'],
            include: [{
              attributes: ['id', 'simpleSum'],
              model: PriceRuleGroup,
              include: [{
                attributes: ['id', 'name', 'rule', 'ruleValueFrom', 'ruleValueTo', 'percentage', 'hardValue'],
                model: PriceRules
              }]
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
}