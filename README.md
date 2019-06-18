# Basic-demo
> Webpack4.x+Babel7.x+React16.x平台搭建

## 项目初始化
通过`npm init`初始化项目，一路yes，生成package.json文件

## 安装webpack4
```
npm i -g webpack webpack-cli
npm i -D webpack webpack-cli
```

## 安装babel7
* 全局安装`@babel/cli` `@babel/core`，安装后可检查babel版本
```
npm i -g @babel/cli @babel/core
babel -V //7.4.4 (@babel/core 7.4.5)
```
* 项目安装`@babel/core` `@babel/preset-env` `@babel/preset-react`，同时安装`@babel/polyfill`
```
npm i -D @babel/core @babel/preset-env @babel/preset-react
npm i -S @babel/polyfill
```

## 安装webpack各种常用加载器、插件和工具
```
npm i -D clean-webpack-plugin html-webpack-plugin
npm i -D file-loader url-loader style-loader css-loader babel-loader
npm i -D webpack-dev-server webpack-merge
```

## 安装React依赖
```
npm i -S react react-dom react-router-dom
```

## 新建配置文件和项目目录
* 在根目录下新建config目录，新建如下三个配置文件：
    * webpack.base.conf.js为公用配置
    ```
    //webpack.base.conf.js
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
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx']
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
    ```
    * webpack.dev.conf.js为开发环境配置，继承自webpack.base.conf.js
    ```
    //webpack.dev.conf.js
    'use strict'
    const merge = require('webpack-merge');
    const baseWebpackConfig = require('./webpack.base.conf');

    const path = require('path');
    const webpack = require('webpack');

    module.exports = merge(baseWebpackConfig, {
      // 模式
      mode: "development",
      // 调试工具
      devtool: 'inline-source-map',
      // 开发服务器
      devServer: {
        contentBase: false,// 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
        historyApiFallback: true,// 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        compress: true,// 启用gzip压缩
        inline: true,// 设置为true，当源文件改变时会自动刷新页面
        hot: true,// 模块热更新，取决于HotModuleReplacementPlugin
        host: '127.0.0.1',// 设置默认监听域名，如果省略，默认为“localhost”
        port: 8703// 设置默认监听端口，如果省略，默认为“8080”
      },
      // 插件
      plugins: [
        // 热更新相关
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
      ],
      optimization: {
        nodeEnv: 'development',
      }
    });
    ```

    * webpack.prod.conf.js为生产环境配置，继承自webpack.base.conf.js
    ```
    //webpack.prod.conf.js
    'use strict'
    const merge = require('webpack-merge');
    const baseWebpackConfig = require('./webpack.base.conf');

    const path = require('path');
    const webpack = require('webpack');
    const CleanWebpackPlugin = require('clean-webpack-plugin');

    module.exports = merge(baseWebpackConfig, {
      // 模式
      mode: "production",
      // 调试工具
      devtool: '#source-map',
      // 输出
      output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "js/[name].[chunkhash].js",
      },
      // 插件
      plugins: [
        new CleanWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin(),
      ],
      // 代码分离相关
      optimization: {
        nodeEnv: 'production',
        runtimeChunk: {
          name: 'manifest'
        },
        splitChunks: {
          minSize: 30000,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          name: false,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              chunks: 'initial',
            }
          }
        }
      }
    });
    ```
  
* 在根目录下新建src目录，并新建如下两个文件，写个hello world页面
    * index.js为项目入口文件，负责挂载react组件到`<div id="app"></div>`上
    ```
    //index.js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App.js';

    ReactDOM.render(<App />, document.getElementById('app'));
    ```
    * App.js为React项目根组件
    ```
    //App.js
    import React from 'react';

    export default class App extends React.Component{
        render(){
            return (
                <div>Hello World!</div>
            )
        }
    };
    ```
* 在根目录下创建模板HTML页面index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <!-- 移动端全屏 -->
  <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1.0, user-scalable=0">
  <!-- 防止页面缓存 -->
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Cache-Control" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <title>react hello world</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```
* 配置package.json的scripts属性
```
"scripts": {
  "dev": "webpack-dev-server --hot --inline --progress --colors --config config/webpack.dev.conf.js",
  "start": "npm run dev",
  "build": "webpack --progress --colors --config config/webpack.prod.conf.js"
}
```
  
* 根目录下新建并配置.babelrc文件
```
{
    "presets": [
        [
            "@babel/preset-env",
            {
              "targets": {
                "edge": "17",
                "firefox": "60",
                "chrome": "67",
                "safari": "11.1",
              }
            },
          ],
          "@babel/preset-react"
    ],
    "plugins": []
}
```
## 测试效果
```
npm start         \\测试开发模式
npm run build     \\测试生产模式
```