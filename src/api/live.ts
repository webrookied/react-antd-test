import http from './fetch'

// 获取数据列表
export const getLive = (data?) => {
  return http.get('/live', { params: data })
}

// 获取详情
export const getDetail = (id) => {
  return http.get('/live/detail', { params: { id } })
}

// 改变状态
export const setLiveType = (data) => {
  return http.post('/set/type', data)
}
