const path = require('path');
const webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // the entry file for the bundle
  entry: path.join(__dirname, '/client/src/app.jsx'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js',
    //publicPath: './server/static/'
  },
  plugins: [
    new CleanWebpackPlugin(['./client/dist']),
    new HtmlWebpackPlugin({
      title: 'Cykelbokning',
      filename: 'index.html',
      template: './index.template.ejs'
    })
    //new webpack.HotModuleReplacementPlugin()
  ],
  module: {

    // apply loaders to files that meet given conditions
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '/client/src'),
        loader: 'babel-loader'

      },
      {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
              'file-loader?name=images/[name].[ext]',
              'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
              'url-loader?limit=8192'
          ],
          include: path.join(__dirname, '/client/src')
      }
    ],
  }

  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes

};
