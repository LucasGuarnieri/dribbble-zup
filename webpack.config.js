'use strict'

// load module nodejs path
const path              = require ('path')
const webpack           = require('webpack')
const extractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // source map
  devtool: 'source-map',

  entry:[
    'webpack-dev-server/client?http://localhost:3000',
    path.join(__dirname, 'src', 'index'),
  ], 
  
  // output dist js
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },

  module: {
    rules: [
      
      // config js lint
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        include: /src/,
        loader: 'standard-loader'
      },

      // config babel module
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: /src/,
        loader: 'babel-loader'
      },

      //config sass module
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        include: /src/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
          ]
        })
      }
    ]
  },
  
  plugins: [
    // export css to dist
    new extractTextPlugin({
      filename: (getPath) => {
        return getPath('style.css')
      }
    }),

    // export html to dist
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: false
    })
  ]
}
