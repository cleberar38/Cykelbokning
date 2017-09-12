const path = require('path');
const webpack = require('webpack');

module.exports = {
  // the entry file for the bundle
  entry: path.join(__dirname, '/client/src/app.jsx'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js',
    publicPath: './server/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}  
          }
        ]
      }
    ],

    // apply loaders to files that meet given conditions
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '/client/src'),
        loader: 'babel',
        query: {
          presets: ["react", "es2015"]
        }
      }
      // ,
      // {
      //     test: /\.(jpe?g|png|gif|svg)$/i,
      //     loaders: [
      //         'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
      //         'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
      //     ]
      // }
    ],
  },

  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true
};
