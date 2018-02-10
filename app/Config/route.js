const preHandlers = require('../preHandlers')

module.exports = function(registrar) {
  registrar({
    method: 'GET',
    path: '/api/siteConfig/{token?}',
    config: {
      handler: function (req, resp) {
        const configLanguages = require('../../config/languages')
        return {
          language: {
            default: 'en',
            dictionary: configLanguages
          }
        };
      },
      description: 'Get site config',
      notes: 'Site config',
      tags: ['api', 'site', 'config']
    }
  })

  registrar({
    method: 'GET',
    path: '/api/checkToken/{token?}',
    config: {
      pre: [{
        assign: 'user',
        method: preHandlers.tokenCheck
      }],
      handler: function (req, resp) {
        return req.pre.user
      },
      description: 'Get site config',
      notes: 'Site config',
      tags: ['api', 'site', 'config']
    }
  })
}
