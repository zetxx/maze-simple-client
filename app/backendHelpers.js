const round = (number, precision) => {
  var factor = Math.pow(10, precision)
  var tempNumber = number * factor
  var roundedTempNumber = Math.round(tempNumber)
  return roundedTempNumber / factor
}

const priceDiffCalc = (price, percentage, hardValue, simpleAdd) => {
  return round(((price * ((percentage / 100) + 1)) + hardValue) - price, 2)
}

module.exports.round = round

var simpleAdd = false

module.exports.priceCalc = (priceRules) => {
  return (p) => {
    var simpleAddArray = 0

    return priceRules.reduce((price, priceRule) => {
      if (
        (priceRule.rule === '>' && price > priceRule.ruleValueFrom) ||
        (priceRule.rule === '<' && price < priceRule.ruleValueFrom) ||
        (priceRule.rule === 'between' && price >= priceRule.ruleValueFrom && price <= priceRule.ruleValueTo)
      ) {
        var priceDiff = priceDiffCalc(price, priceRule.percentage, priceRule.hardValue, simpleAdd)
        if (!simpleAdd) {
          price = price + priceDiff
        } else {
          simpleAddArray = simpleAddArray + priceDiff
        }
        return price
      }

      return price
    }, p) + simpleAddArray
  }
}
