module.exports.round = (number, precision) => {
  var factor = Math.pow(10, precision)
  var tempNumber = number * factor
  var roundedTempNumber = Math.round(tempNumber)
  return roundedTempNumber / factor
}

module.exports.priceCalc = (priceRules) => {
  return (p) => {
    return priceRules.reduce((price, priceRule) => {
      if (priceRule.rule === '>') {
        if (price > priceRule.ruleValueFrom) {
          return module.exports.round((price * ((priceRule.percentage / 100) + 1)) + priceRule.hardValue, 2)
        }
      } else if (priceRule.rule === '<') {
        if (price < priceRule.ruleValueFrom) {
          return module.exports.round((price * ((priceRule.percentage / 100) + 1)) + priceRule.hardValue, 2)
        }
      } else if (priceRule.rule === 'between') {
        if (price >= priceRule.ruleValueFrom && price <= priceRule.ruleValueTo) {
          return module.exports.round((price * ((priceRule.percentage / 100) + 1)) + priceRule.hardValue, 2)
        }
      }

      return price
    }, p)
  }
}
