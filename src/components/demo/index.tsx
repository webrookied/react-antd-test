import React, { useEffect, useState, FC } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
// import { Uploader } from 'components'
// import Uploader from './components/uploader/index'
import { Uploader } from 'components/index'
import { ActionCreator } from 'store/reducers/home'
import { useAppDispatch } from 'hooks/useStore'
// dispatch 发送命令
type CountType = { page: number; size: number }
/**
 * 作用：使用react-redux去连接react组件和redux仓库
 * 从redux拿数据有两种方式 ？
 * 1. HOC模式 -> connect形式拿数据
 * 2. useSelector(s => s)
 */

function App(props) {
  const [count, setCount] = useState<CountType>({ page: 1, size: 5 })
  const [num, setNum] = useState<number>(0)

  console.log(props, 'props')
  const dispatch = useAppDispatch()

  // //
  // const store = useAppSelector((s) => s)
  // console.log('store:', store)
  // const callback = () => {}
  useEffect(() => {
    // document.addEventListener('resize', callback)
    return () => {
      // document.removeEventListener('resize', callback)
    }
  }, [])
  return (
    <div className='App'>
      {/* <Uploader></Uploader> */}
      <h1>
        {count.page} : {num}
      </h1>
      <button
        onClick={() => {
          // let n = ++count.page
          console.log(count, 'count')
          // count
          // setNum(++num);
          setCount({ ...count })
          // setCount({ ...count, page: n })
          // setCount((count) => {
          //   return { ...count, page: n }
          // })
          // setCount((count) => ({ ...count, page: n }))
        }}>
        按钮
      </button>
    </div>
  )
}
// redux ： state action
const mapStateToProps = (state) => {
  return { ...state }
}
const mapActionToProps = (dispatch) => {
  return { dispatch }
}

// 柯里化调用
export default connect(mapStateToProps, mapActionToProps)(App)
/**
 * const [a, b , c] = arr 数组解构
 * const {page:{a, b}, size} = ctx.query; 对象解构
 * { ...obj } ...拓展符  三个点用在数组或者对象中的时候，都叫拓展符；也叫展开符
 * 展开...  const obj = {name: '', age: '',sex: ''}
 * let a = {...obj}
 * a = {name: '', age: '',sex: ''}
 */

/**
 * useState:
 * 1. 管理状态的一个hooks
 * 2. 使用方法（基本数据类型，引用数据类型）按值传递 按引用传递
 * 当useState中是引用类型的时候，更新的时候要同步更新。
 * 3. useState 更新的书写方式。一种是函数形式，另一种非函数形式，
 * 基本数据类型，非函数形式和函数形式都可以
 * 引用数据类型，尽量使用函数形式。
 * 4. useState更新数据之后，会引起页面渲染。
 * 更新基本数据类型：直接更新，页面就会渲染
 * 更新引用类型数据：拷贝更新，就会是一个新的地址，就会引起页面渲染。如果直接更新，有可能使用的是上一次的引用地址，导致页面不更新
 */

// 1. 请求数据 2. 打印数据-监听 3. 操作dom  4. 定时器 5. 原生事件
/**
 * ⭐️ useEffect 处理 => 副作用操作 （ ajax / 定时器 / 事件 => 异步 ）
 * 1. 请求数据   componentDidMount
 * 2. 操作dom:   componentDidMount ->
 * 3. 定时器：   componentDidMount = componentWillUnMount
 * 4. 原生事件: dom2级绑定事件 componentDidMount = componentWillUnMount
 *
 * 1. 监听：     componentDidUpdate
 */
