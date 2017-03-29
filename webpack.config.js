const webpack               = require('webpack')
const path                  = require('path')
const HtmlWebpackPlugin     = require('html-webpack-plugin')
const ExtractTextPlugin     = require('extract-text-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const indexHtml = path.join(__dirname, "app", "index.html")

module.exports = {
  entry: [
    path.join(__dirname, "app/js/", "app.js"),
    indexHtml
  ],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['es2015'] }
        }]
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: 'img/[hash].[ext]'
            }
          },
          'image-webpack-loader'
        ]
      },
      {
        test: indexHtml,
        use: [
          'html-loader',
          'markup-inline-loader'
        ]
      },
      {
        test: /\.woff$/,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: 'fonts/[name].[ext]'
            } 
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'app/index.html'
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new FaviconsWebpackPlugin('./app/img/favicon.png')
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './build')
  }
};