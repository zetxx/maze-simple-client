const config = require('./server.js')

module.exports = {
  development: {
    url: config.db,
    seederStorage: 'sequelize',
    dialect: config.dbDialec
  },
  test: {
    url: config.db,
    seederStorage: 'sequelize',
    dialect: config.dbDialec
  },
  production: {
    url: config.db,
    seederStorage: 'sequelize',
    dialect: config.dbDialec
  }
}
