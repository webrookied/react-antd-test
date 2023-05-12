import * as actionTypes from './actionTypes'
import { MenuAction, MenuState } from '@/types'

const initGlobalState: MenuState = {
  SALES_REALESTATE: [], // 保存已经打开的菜单栏 用于顶部导航
  REGION: [],
  USERList: [],
}

export default function reducer(state = initGlobalState, action: MenuAction): MenuState {
  const { type, keys } = action
  // console.log(keys)
  switch (type) {
    //售房数据
    case actionTypes.SALES_REALESTATE: {
      return { ...state, SALES_REALESTATE: action.keys }
    }
    //区域数据
    case actionTypes.SET_REGION: {
      return { ...state, REGION: action.keys }
    }
    //经纪人数据
    case actionTypes.SET_USERLIST: {
      return { ...state, USERList: action.keys }
    }
    default: {
      return state
    }
  }
}
