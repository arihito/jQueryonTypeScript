'use strict'
var path = require('path');
var webpack = require('webpack');
var env = process.env.NODE_ENV;

let config = {
  entry: {
    app : './ts/app.ts'
  },
  output: {
    filename: '[name].js'
  },
  resolve: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : JSON.stringify(env)
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
};

if (env === 'production') {
  config.output.filename = '[name].min.js';
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
} else {
  config.devtool = 'source-map';
}
module.exports = config;
