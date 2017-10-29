const crypto = require('crypto')
const key = 'abbaioiowejofcw fo23cm ekrh fndnsm,dj'
const session = () => {
  var db = {1: {lastUpdated: Date.now() + 9999999999999}}
  var check = (token) => {
    const decipher = crypto.createDecipher('aes256', key)
    return (new Promise((resolve, reject) => {
      var text = ''
      try {
        text = decipher
          .update(token, 'hex', 'utf8') + decipher
            .final('utf8')
        text = JSON.parse(text)
      } catch (e) { reject(e) }
      resolve(text)
    }))
      .then((r) => {
        var id = r.id
        if (!db[id]) {
          throw new Error('Invalid session')
        } else if (db[id] && db[id].lastUpdated < Date.now()) {
          delete db[id]
          throw new Error('Invalid session')
        }
        updateTime(r.id)
        return r
      })
  }
  var updateTime = (id) => {
    db[id].lastUpdated = Date.now() + (1000 * 15 * 60)
  }
  var register = (id, username) => {
    db[id] = {lastUpdated: 0}
    updateTime(id)

    const cipher = crypto.createCipher('aes256', key)
    return cipher
      .update(JSON.stringify({id, username}), 'utf8', 'hex') +
      cipher
        .final('hex')
  }

  return {
    check,
    updateTime,
    register
  }
}

module.exports = session()
