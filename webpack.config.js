const webpack           = require('webpack')
const path              = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")

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
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
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
    // new CompressionPlugin({
    //   asset: "[path].gz[query]",
    //   algorithm: "gzip",
    //   test: /\.js$|\.css$|\.html$/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './build')
  }
};