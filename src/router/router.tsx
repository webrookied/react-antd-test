import React from 'react'
import { lazy } from 'react'
//引入布局组件
import { MyLayout } from '../components'
import { RouterType } from '../types'
//引入路由级组件 并且懒加载
const Home = lazy(() => import('../views/Home')) //主页
const Live = lazy(() => import('../views/Live')) //直播
const Group = lazy(() => import('../views/GroupBuying')) //团购
const Agent = lazy(() => import('../views/Agent'))

const RoutersTable: RouterType[] = [
  {
    path: '/',
    element: (
      <MyLayout>
        <Home></Home>
      </MyLayout>
    ),
    meta: {
      title: '测试1',
    },
  },
  {
    path: '/file',
    element: (
      <MyLayout>
        <Live></Live>
      </MyLayout>
    ),
    meta: {
      title: '测试2',
    },
  },
  {
    path: '/group',
    element: (
      <MyLayout>
        <Group></Group>
      </MyLayout>
    ),
    meta: {
      title: '测试3',
    },
  },
]
export default RoutersTable
