// client配置
const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // 分离打包后的css内容
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV  === 'development'

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new VueLoaderPlugin(),
  new HTMLPlugin()
]

const devServer = {
  port: 8080,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  hot: true
}

let config

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
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
            'vue-style-loader',
            "css-loader",
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              }
            },
            "stylus-loader"
          ]
        }
      ]
    },
    plugins: defaultPlugins.concat([
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
    ])
  })
}

module.exports = config
