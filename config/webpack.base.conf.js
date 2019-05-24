'use strict'
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口起点
  entry: {
    app: './src/index.js',
  },
  // 输出
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].js",
  },
  // 解析
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  // loader
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,// 屏蔽不需要处理的文件（文件夹）（可选）
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body'
    })
  ]
}