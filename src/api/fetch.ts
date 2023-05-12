import axios from 'axios'
import { redirect, Navigate } from 'react-router-dom' //看具体项目封装的路由文件修改
// //跳转登陆页面
const toLogin = () => {
  // console.log('执行了以下的组件', redirect)
  return redirect('/basic')
}
//封装状态码错误处理函数
const handleError = (status) => {
  switch (status) {
    //登录不成功时跳转到登录页面
    case 401:
      console.log('认证失败,未登录或无权限')
      toLogin()
      break
    case 403:
      //token过期了,清除token存储
      localStorage.removeItem('token')
      console.log('token校验失败')
      toLogin()
      break
    case 404:
      console.log('请求的资源不存在')
      break
    default:
      console.log('请求出错,状态码为:' + status)
      break
  }
}
// // axios二次封装
// const devBaseURL = '在开发环境下接口的baseURL'
// const proBaseURL = '在生产环境下接口的baseURL'
// const baseURL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL
// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
const http = axios.create({
  timeout: 5000,
})
// 定义一个全局的变量存储不同的url,避免同一页面有多个请求时拦截了正常的请求
const pending = {}

// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
// 设置post请求的 Content-Type，需不需要写看后台规范
http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// //允许跨域传递cookie带上凭证，看具体项目，通常要设为true
http.defaults.withCredentials = true
// 添加请求拦截器
// //ES6解构赋值，引入cancelToken和isCancel
const { CancelToken, isCancel } = axios
http.interceptors.request.use(
  function (config) {
    //获取本地存储中的token,若有token则加到请求中去，token一般存储到本地或者vuex/redux中
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)

    // 取消重复请求
    // 用每个请求的url当作唯一标识的key值取消重复请求
    const key = config.url + '&' + config.method
    //若上一个请求已存在则调用函数取消上一次的重复请求
    console.log('pending:', pending[key])
    config.cancelToken = new CancelToken((c) => {
      // 将取消请求的函数c赋值给pending[key]保存取消函数
      pending[key] = c
    })
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // console.log(error)
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)

export default http
