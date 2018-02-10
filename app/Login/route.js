const crypto = require('crypto')
const Joi = require('joi')
const Boom = require('boom')
const users = require('../Users/model')
const session = require('../session')

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/login',
    config: {
      handler: function (req, resp) {
        const hash = crypto.createHash('sha256')
        hash.update(req.payload.password)
        return users.find({
          where: {
            username: req.payload.username,
            password: hash.digest('hex')
          }
        })
          .then((user) => {
            if (!user) {
              throw Boom.unauthorized('invalid username/password')
            }
            var token = session.register(user.id, user.userName)
            return {
              username: user.userName,
              token
            }
          })
      },
      description: 'User login',
      notes: 'User login',
      tags: ['api', 'user', 'login'],
      validate: {
        payload: {
          username: Joi.string().min(1).required().description('User password'),
          password: Joi.string().min(1).required().description('User password')
        }
      }
    }
  })
}
