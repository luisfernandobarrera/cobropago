var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

var config = require('./webpack.base.config.js');

config.plugins = config.plugins.concat([
    new BundleTracker({filename: './cobropago/webpack-stats.json'}),
]);

module.exports = config;

