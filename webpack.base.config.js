var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');


module.exports = {
  context: __dirname,

  entry: ['./app/src/index', './app/src/auth/index'],

  output: {
    path: path.resolve('./cobropago/web/static/bundles/'),
    filename: "[name]-[hash].js"
  },

  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      foundation: "foundation"
    }),
    new BundleTracker({filename: './cobropago/webpack-stats.json'})
  ],

  module: {
    loaders: [
      // process *.vue files using vue-loader
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      // process *.js files using babel-loader
      // the exclude pattern is important so that we don't
      // apply babel transform to all the dependencies!
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        // for some modules like foundation
        test: /\.scss$/,
        exclude: [/node_modules/], // sassLoader will include node_modules explicitly
        loader: ExtractTextPlugin.extract("style", "css?sourceMap!postcss!sass?sourceMap&outputStyle=expanded")
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css?sourceMap!postcss")
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }

    ]

  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  }
};
