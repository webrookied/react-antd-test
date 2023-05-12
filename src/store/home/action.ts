import * as ActionTypes from './actionTypes'
import { secondHousing, getMarketBroker } from '../../api/home'
//获取售房的数据
export const GetSalesList = (keys: any[]) => ({
  type: ActionTypes.SALES_REALESTATE,
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

//获取售房的数据
export const getSalesList = {
  // 这个一个普通的action 一个普通对象
  // 因为有了thunk中间件，才能传递函数（一个函数，作为参数，传递给其他函数中，就是回调函数=>高阶函数-高阶组件）dispath(ActionCreator.fetch_ajax_data())
  fetch_ajax_data: (value): any => {
    // 这个dispatch就是thunk中间件传递过来的。
    return async (dispath) => {
      const {
        data: { data },
      } = await secondHousing(value)
      //添加表格的key
      data.length > 0 &&
        data.map((v, i) => {
          return (v.key = i + 1)
        })
      const region = new Set()
      data.map((v, i) => {
        region.add(v.quyu)
      })
      const regionlist = [...region].map((item) => {
        return {
          value: item,
          label: item,
        }
      })
      dispath(GetRegiont(regionlist))
      dispath(GetSalesList(data))
      // return res.data
    }
  },
}

//获取经纪人列表
export const getUserList = (): any => {
  return async (dispath) => {
    const {
      data: { data },
    } = await getMarketBroker()
    dispath(GetUserList(data))
  }
}
// //获取经纪人列表
// export const getREGIN_SEARC = (): any => {
//   return async (dispath) => {
//     const {
//       data: { data },
//     } = await getMarketBroker()
//     dispath(GetUserList(data))
//   }
// }
