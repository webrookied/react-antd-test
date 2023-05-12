import * as ActionTypes from './actionTypes'
import { getLive } from '../../api/live'
//获取售房的数据
export const GetLiveList = (keys: any[]) => ({
  type: ActionTypes.GET_LIVE_LIST,
  keys,
})
//获取区域的数据
export const GetRegiont = (keys: any[]) => ({
  type: ActionTypes.SET_REGION,
  keys,
})
//获取经纪人数据
export const GetUserList = (keys: any[]) => ({
  type: ActionTypes.SET_USERLIST,
  keys,
})
//搜索的接口
export const GetREGIN_SEARC = (keys: any[]) => ({
  type: ActionTypes.REGIN_SEARCH,
  keys,
})

export const getLiveList = ({ name, statu }): any => {
  console.log(name, statu)
  return async (dispath) => {
    const {
      data: { data },
    } = await getLive({ name, statu })
    dispath(GetLiveList(data))
  }
}
