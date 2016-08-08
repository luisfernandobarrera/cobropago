var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname,

  entry: './frontend/js/index', // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs

  output: {
      path: path.resolve('./cobropago/web/static/bundles/'),
      filename: "[name]-[hash].js"
  },

  plugins: [
    new BundleTracker({filename: './cobropago/webpack-stats.json'})
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      } // to transform JSX into JS
    ]
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  }
};