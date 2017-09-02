const path = require('path');
const AutoDllPlugin = require('../../lib');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    main: './src/index.js',
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
    }),
    new AutoDllPlugin({
      debug: true,
      filename: '[name].[hash].js',
      // path is not working with loaders for now
      path: './dll',
      inject: true,
      inherit: true,
      entry: {
        vendor: [
          // './src/awesome-module.js'
          // 'font-awesome/css/font-awesome.css',
          'react',
          'react-dom',
          'moment',
          'font-awesome'
        ],
        other: [
          'react'
        ]
      },

      config: {
        output: {

        },
        plugins: [
          // new UglifyJsPlugin()
        ]
      }
    })
  ]
};