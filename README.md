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
    * webpack.dev.conf.js为开发环境配置，继承自webpack.base.conf.js
    * webpack.prod.conf.js为生产环境配置，继承自webpack.base.conf.js
  

* 在根目录下新建src目录，并新建如下两个文件，写个hello world页面
    * index.js为项目入口文件，负责挂载react组件到`<div id="app"></div>`上
    * App.js为React项目根组件
<br />
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