const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  // app.use(
  //   '/api',
  //   createProxyMiddleware({
  //     target: 'http://localhost:9999',
  //     changeOrigin: true, // 设置跨域请求
  //     pathRewrite: {
  //       '^/api': '', // 将/api 变为 ''
  //     },
  //   }),
  // )
}
