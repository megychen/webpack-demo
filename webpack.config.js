const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // 分离打包后的css内容
const isDev = process.env.NODE_ENV  === 'development'

const config = {
  target: 'web',
  mode: 'development',
  entry: path.join(__dirname, 'client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin()
  ]
}

if (isDev) {
  config.module.rules.push({
    test: /\.styl/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  })
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8080,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.entry = {
    app: path.join(__dirname, 'client/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'

  config.module.rules.push({
    test: /\.styl/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // you can specify a publicPath here
          // by default it use publicPath in webpackOptions.output
          // publicPath: '../'
        }
      },
      "css-loader",
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        }
      },
      "stylus-loader"
    ]
  })
  config.plugins.push(
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'styles.[contentHash:8].css'
    }),
    new webpack.optimize.RuntimeChunkPlugin({
      name: "vendor"
    }),
    new webpack.optimize.RuntimeChunkPlugin({
        name: "runtime"
    })
  )
}

module.exports = config
