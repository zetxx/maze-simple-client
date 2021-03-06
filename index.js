const config = require('./config/server')
const Hapi = require('hapi')
const Inert = require('inert')
const Vision = require('vision')
const Path = require('path')
const HapiSwagger = require('hapi-swagger')
const webpackFrontendWatch = require('./config/webpack.js').watch

const Pack = require('./package')

const server = Hapi.Server(Object.assign({
  routes: {
    files: {
      relativeTo: Path.join(__dirname, './public')
    }
  }
}, config.httpServer))
// server.connection(config.httpServer)

const provision = async () => {
  await server.register([
    Inert,
    Vision,
    {
        plugin: HapiSwagger,
        options: {info: {
          'title': 'Test API Documentation',
          'version': Pack.version || '0'
        }}
    },
    webpackFrontendWatch()
  ])

  await server.start()
  console.log('Server running at:', server.info.uri)
};

provision()

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

// register dynamic routes
require('./app/Config/route')(server.route.bind(server))
require('./app/Login/route')(server.route.bind(server))
require('./app/Products/route')(server.route.bind(server))
require('./app/Files/route')(server.route.bind(server))
