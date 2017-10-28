
module.exports = function(registrar) {
  registrar({
    method: 'GET',
    path: '/api/siteConfig',
    config: {
      handler: function (req, resp) {
        const configLanguages = require('../../config/languages')
        resp({
          language: {
            default: 'en',
            dictionary: configLanguages
          }
        })
      },
      description: 'Get site config',
      notes: 'Site config',
      tags: ['api', 'site', 'config']
    }
  })
}
