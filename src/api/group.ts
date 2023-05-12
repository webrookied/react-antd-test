import http from './fetch'

// 获取数据
export const getGroup = (data) => {
  return http.get('/group', { params: data })
}

// 删除
export const delGroup = (data) => {
  console.log(data)
  return http.delete('/del/group', { params: data })
}

// 设置团购状态
export const setGroup = (data) => {
  return http.post('/set/group', data)
}

// 获取省
export const getProvince = () => {
  return http.get('/getProvince')
}

// 获取市
export const getCity = (data) => {
  return http.get('/getCity', { params: data })
}

// 获取县
export const getCounty = (data) => {
  return http.get('/getCounty', { params: data })
}
