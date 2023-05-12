/**
 * @name ActionCreator 生成器
 */
export const ActionCreator = {
  // 这个一个普通的action 一个普通对象
  init_data(params) {
    return {
      type: 'GET_LIST',
      payload: params,
    }
  },
  // 因为有了thunk中间件，才能传递函数（一个函数，作为参数，传递给其他函数中，就是回调函数=>高阶函数-高阶组件）dispath(ActionCreator.fetch_ajax_data())
  // fetch_ajax_data: (): any => {
  //   // 这个dispatch就是thunk中间件传递过来的。
  //   return async (dispath) => {
  //     const res = await fetch('http://47.101.45.245:7001/allHouseAudit').then((res) => res.json())
  //     dispath(ActionCreator.init_data(res.data))
  //     // return res.data
  //   }
  // },
}

/**
 * @name 默认仓库
 */
const defaultState: DefaultStateType = {
  list: [],
}

/**
 * @name reducer函数
 */
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

// reducer 是什么？
// 使用的时候，需要注意什么？
/**
 * @name reducer
 * reducer处理数据逻辑的地方，但是只能处理同步逻辑
 * 如果要处理接口或者其他异步怎么办？
 * 借助第三方中间 redux-thunk => 原理：(异步解决方案：回调，promise, * , async, 发布订阅)
 *   // reducer (=> vuex: module-mutations)
  // 为什么要拷贝？如果不拷贝操作，会出现什么问题？
 *
    // 1. 拷贝数据
  // 2. 处理数据
  // 3. 返回数据
  // return {}
 */

/**
 *  reducer - store仓库 - 组件
 *

 *
 * 组件订阅仓库数据，组件不能更新数据，如果组件要更新数据，怎么办？
 * 组件发送一个命令（action），这个命令给了 store, store处理后，给了reducer,
 * reducer接收到命令后，处理数据，返回数据，而且必须拷贝返回。
 *
 * 为什么要拷贝返回数据？
 * diff算法，就是比较新旧数据，如果是旧数据，就不更新页面，如果是新数据才更新。
 *
 * reducer 更新基本数据类型的话，不需要拷贝（按值传递）
 * reducer 更新引用类型 [] {}, 必须拷贝（按引用传递）
 *
 *
 * dipatch({
 *   type: '', 命令，
 *   payload: [] 数据
 * })
 *
 */
/**
 * redux 有三大原则：
 * 1. 单向数据流（reducer -> store -> 组件）=> 如果一个组件不使用redux，是否还是单向数据流 useState
 * 2. 数据不可变状态（组件不能直接改变这个状态/数据）
 * 3. 如果要改变 通过reducer可以改变 (dispath - 发送一个 action )
 *
 * 改变完这个数据之后，要拷贝返回-diff算法 {...state}
 */

// action 命令
