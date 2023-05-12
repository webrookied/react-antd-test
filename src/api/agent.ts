import http from './fetch'

// 获取经纪人列表
export const getBrokerList = (data) => {
  return http.get('/broker', { params: data })
}

// 删除经纪人列表
export const delBrokerList = (id) => {
  return http.delete('/del/broker', { params: { id } })
}

// 添加经纪人状态接口
export const addBroker = (content) => {
  return http.put('/add/Broker', content)
}

// 编辑技能攻击人状态接口
export const editBroker = (content) => {
  return http.post('/set/Broker', content)
}

// 修改经纪人状态
export const setBrokerStatus = (data) => {
  return http.post('/set/BrokerStatus', data)
}
