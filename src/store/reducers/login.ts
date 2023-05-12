// dispath(ActionCreator.init_data())
export const ActionCreator = {
  // 这个一个普通的action 一个普通对象
  init_data(params) {
    return {
      type: 'GET_LIST',
      payload: params,
    }
  },
  // 因为有了thunk中间件，才能传递函数（一个函数，作为参数，传递给其他函数中，就是回调函数=>高阶函数-高阶组件）dispath(ActionCreator.fetch_ajax_data())
  fetch_ajax_data: (): any => {
    // 这个dispatch就是thunk中间件传递过来的。
    return async (dispath) => {
      const res = await fetch('http://47.101.45.245:7001/allHouseAudit').then((res) => res.json())
      dispath(ActionCreator.init_data(res.data))
      // return res.data
    }
  },
}

const defaultState: DefaultStateType = {
  list: [],
}

export default (state = defaultState, action: ActionType) => {
  switch (action.type) {
    case 'GET_LIST':
      state.list = [...state.list, action.payload]
      return { ...state } // 拷贝

    default:
      return state
  }
}

// 面试题：redux 数据流 reducer 是一个纯函数，只能处理同步逻辑，不能副作用操作
// ajax/定时器/事件
// const newState = JSON.parse(JSON.stringify(state))
// if (action.type === 'UPDATE_LIST') {
//   newState.list = [...newState.list, { name: 'devin' }]
// }
// return newState
