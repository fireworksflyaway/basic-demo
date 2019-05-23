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