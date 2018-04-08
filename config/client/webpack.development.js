const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const src = { client: path.join(process.cwd(),  'src', 'client') };
const dist = { client: path.join(process.cwd(), 'dist', 'client') };

const webpackCommon = require('./webpack.common');

module.exports = webpackMerge(webpackCommon, {
  devtool: 'inline-source-map',

  mode: 'development',

  output: {
    path: dist.client,
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  devServer: {
    historyApiFallback: true
  }
});