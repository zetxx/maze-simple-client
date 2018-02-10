const config = require('./server.js')
var path = require('path')
const settings = {
  context: path.resolve(__dirname, 'app'),
  entry: './app/index.jsx',
  output: {
    filename: 'index.js',
    path: path.resolve('./public/src/'),
    publicPath: '/src/'
  }
}

module.exports = {
  watch: () => {
    if (config.env === 'development') {
      const Webpack = require('webpack')
      const wpconf = {
        devtool: 'eval-source-map',
        entry: [
          'babel-polyfill',
          'webpack-hot-middleware/client',
          settings.entry
        ],
        output: settings.output,
        name: 'browser',
        node: {
          fs: 'empty',
          net: 'empty',
          tls: 'empty'
        },
        resolve: {
          extensions: ['.js', '.jsx']
        },
        module: {
          rules: [
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              use: [{
                loader: 'react-hot-loader/webpack'
              }, {
                loader: 'babel-loader',
                options: {
                  presets: ['env', 'react', 'stage-0', 'react-hmre']
                }
              }]
            },
            { test: /\.json$/, use: {loader: 'json'} },
            { test: /\.css$/, use: {loader: 'style-loader!css-loader'} },
            {
              test: /.*\.(gif|png|jpe?g|svg|ico)$/i,
              use: [{
                loader: 'url-loader',
                options: {
                  limit: 30720000
                }
              }]
            }
          ]
        },
        plugins: [
          new Webpack.HotModuleReplacementPlugin()
        ]
      }
      const compiler = new Webpack(wpconf)

      const assets = {
        // webpack-dev-middleware options
        // See https://github.com/webpack/webpack-dev-middleware
        noInfo: true,
        stats: { colors: true },
        quiet: true,
        publicPath: wpconf.output.publicPath
      }

      const hot = {
        // webpack-hot-middleware options
        // See https://github.com/glenjamin/webpack-hot-middleware
        publicPath: wpconf.output.publicPath,
        reload: true
      }

      return {
        plugin: require('hapi-webpack-plugin'),
        options: { compiler, assets, hot }
      };
    }
  },
  build: () => {
    const Webpack = require('webpack')
    const wpconf = {
      entry: ['babel-polyfill', settings.entry],
      output: settings.output,
      name: 'browser',
      bail: true,
      node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
      },
      resolve: {
        extensions: ['.js', '.jsx']
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env', 'react', 'stage-0']
              }
            }
          },
          {test: /\.json$/, use: {loader: 'json'}},
          {test: /\.css$/, use: {loader: 'style-loader!css-loader'}},
          {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: {loader: 'url-loader?limit=10000&minetype=application/font-woff'}},
          {test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: {loader: 'file-loader'}},
          {
            test: /.*\.(gif|png|jpe?g|svg|ico)$/i,
            use: [{
              loader: 'url-loader',
              options: {
                limit: 30720000
              }
            }]
          }
        ]
      },
      plugins: [
        new Webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new Webpack.optimize.UglifyJsPlugin()
      ]
    }
    return new Webpack(wpconf, (err, stat) => {
      if (err) {
        return console.error(err)
      } else {
        console.info('Webpack Done')
      }
    })
  }
}
