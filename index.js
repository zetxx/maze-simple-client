const config = require('./config/server')
const Hapi = require('hapi')
const Inert = require('inert')
const Vision = require('vision')
const Path = require('path')
const HapiSwagger = require('hapi-swagger')
const webpackFrontendWatch = require('./config/webpack.js').watch

const Pack = require('./package')

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, './public')
      }
    }
  }
})
server.connection(config.httpServer)

server.register([
  Inert,
  Vision, {
    'register': HapiSwagger,
    'options': {
      info: {
        'title': 'Test API Documentation',
        'version': Pack.version || '0'
      }
    }
  }],
(err) => {
  if (err) {
    console.error(err)
  } else {
    server.start((err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Server running at:', server.info.uri)
      }
    })
  }
})

server.route([{
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: '.',
      redirectToSlash: true,
      index: true
    }
  }
}, {
  method: 'GET',
  path: '/favicon.ico',
  handler: { file: './assets/favicon.ico' }
}])
webpackFrontendWatch(server)
// register dynamic routes
require('./app/Config/route')(server.route.bind(server))
require('./app/Login/route')(server.route.bind(server))
require('./app/Products/route')(server.route.bind(server))
