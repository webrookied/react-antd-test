# react

```js
// husky
husky 可以帮助我们在 执行 git commit 提交的时候，按照eslint 规范进行修复代码。
husky是一个git hook工具，可以帮助我们触发git提交的各个阶段：pre-commit、commit-msg、pre-push 支持所有的Git 钩子

// Commitizen
这个时候就需要我们使用 Commitizen 来帮助我们规范提交代码。
Commitizen是一个帮助我们编写规范 commit message 的工具。

// npx commitizen init cz-conventional-changelog --save-dev --save-exact

// npm i @commitlint/config-conventional @commitlint/cli -D

 阻止不规范提交
```

> > > 简单说就是在 Git 执行一些操作时，在钩子处执行一些自己需要的命令。

# 服务器

```js
外网面板地址: https://47.101.45.245:42595/9e253d29
内网面板地址: https://172.19.115.82:42595/9e253d29
username: ed5yohgs
password: 4a31ba72
```

create-react-app 官方文档参考
`https://create-react-app.dev/docs/documentation-intro`
`https://preview.pro.ant.design/dashboard/analysis`

## 目录工程化开发

```js
// 工程目录：
components: // 组件名字 小写-中划线 隔开
 image-wrapper / index.tsx
 uploader / index.tsx
          / style.module.scss => npm i sass -D
 index.ts 统一抛出

 ErrorBoundary.tsx // 错误边界
 401.tsx
 404.tsx
 500.tsx
views: // 页面
  Home/index.tsx
      /style.module.scss
  Login/index.tsx
       /style.module.scss
api: // 接口
   fetch.ts  // axios 封装
   index.ts // 接口
i18n: // 国际化
router: // 路由
hooks: // 自定义hook
store: //

```

`搜一搜自定义hooks放在自己的项目中。useDebounce`

## 接口代理

官网代理地址
`https://create-react-app.dev/docs/proxying-api-requests-in-development/`

```js
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:9999',
      changeOrigin: true, // 设置跨域请求
      pathRewrite: {
        '^/api': '', // 将/api 变为 ''
      },
    }),
  )
}
```

## 去除严格模式下 刷新次数减少

## tsconfig.json 配置

```json
  "baseUrl": "./src", // 配置访问项目别名路径简单化
  "noImplicitAny": false, // 不检测any
  "skipLibCheck": true, // 跳过检查库的代码
  "isolatedModules": false, // 跳过空文件检测

```

## jsx

```js
import React, { Component } from 'react'
import cx from './style.module.scss'
const ImageWrapper = () => {
  return (
    <div>
      <label htmlFor=''></label>
      {/* <div>注释</div> */}
      <div className={cx.box}></div>
    </div>
  )
}

export default ImageWrapper
```

## 安置 scss 配置信息

`npm i sass -D`

```js
// 在项目中使用 Home.module.scss文件。帮助实现scss模块化开发
页面中使用大写开头
组件中使用小写开头
```

## 安置 Normalize.css

`http://necolas.github.io/normalize.css/`
`npm install normalize.css`

```json
// Normalize.css是一种CSS reset的替代方案。
Normalize.css只是一个很小的css文件，但它在默认的HTML元素样式上提供了跨浏览器的高度一致性。相比于传统的css reset，Normalize.css是一种现代的，为HTML5准备的优质替代方案。Normalize.css现在已经被用于Twitter, Bootstrap，HTML5 Boilerplate，GOV.UK，Rdio，CSS Tricks以及许许多多其他的框架，工具和网站上。
```

## react hooks 使用

1. useState
2. useEffect

```js
// componentDidMount
useEffect(() => {}, [])
// componentDidUpdate
useEffect(() => {}, [count])
// componentWillUnMount
useEffect(() => {
  return () => {}
}, [])

// 使用场景：
```

## 组件封装 toB sass 系统（image-wrapper/uploader/ant design 二次封装/button/input/table/pagenation/ form 表单 / 拖拽组件 react-dnd/流程图组件 jsplumb-v2/echarts/highcharts/d3.js/oss 上传）

`基础组件`
`业务组件`：
`数据可视化组件：` DashBoard 页面中
`表单拖拽组件`
`https://g6.antv.antgroup.com/manual/getting-started`

## 业务功能划分：

1. 导航守卫
2. 权限管理（RBAC 模型）
3. 表单拖拽和复用 动态表格，多页面表格，内容拖拽
4. 地图组件
