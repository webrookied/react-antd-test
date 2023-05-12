import * as actionTypes from './actionTypes'
import { MenuAction, LIVETYPE } from '@/types'

const initGlobalState: LIVETYPE = {
  LIVE_LIST: [], //直播的数据
}

export default function reducer(state = initGlobalState, action: MenuAction): LIVETYPE {
  const { type, keys } = action
  // console.log(keys)
  switch (type) {
    //售房数据
    case actionTypes.GET_LIVE_LIST: {
      return { ...state, LIVE_LIST: action.keys }
    }
    default: {
      return state
    }
  }
}
