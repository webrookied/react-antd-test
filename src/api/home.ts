import http from './fetch'

// 获取楼盘列表 (销售楼盘 room1)
export const secondHousing = (data?) => {
  return http.get('/second/housing', { params: data })
}

// 删除
export const deleteRenthouses = (id) => {
  return http.delete('/deleteRenthouses', { params: { id } })
}

// 修改经纪人
export const updataBroker = (data) => {
  return http.post('/alterRentBroker', data)
}

// 改变状态
export const etStatusR = (data) => {
  return http.post('/setRentHouseStatus', data)
}
// 获取房源列表 (租房 room2)
export const getRoom = (data) => {
  return http.get('/housing', { params: data })
}

// 删除
export const deleteMarkethouses = (id) => {
  return http.delete('/deleteMarkethouses', { params: { id } })
}

// 修改状态
export const etStatus = (data) => {
  return http.post('/setMarketHouseStatus', data)
}

// 获取经纪人数据接口
export const getMarketBroker = () => {
  return http.get('/setMarketBroker')
}

// 修改经纪人
export const setBroker = (data) => {
  return http.post('/alterMarketBroker', data)
}
