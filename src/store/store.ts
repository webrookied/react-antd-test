import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import home from './home/reducer'
import login from './reducers/login'
import live from './live/reducer'

// combineReducers cr
// reducer的模块化
const reducers = combineReducers({
  home,
  login,
  live,
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

// ReturnType ts提供了一个：反向注入 一次性注解 store.getState 获取state状态值
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export { store }
