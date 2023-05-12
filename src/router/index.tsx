import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RoutersTable from './router'

const ROUTER: React.FC = () => {
  return (
    /* 一次只渲染一个匹配的路由 */
    <BrowserRouter>
      <Suspense fallback={<div>正在加载..</div>}>
        <Routes>
          {/* 路由渲染 */}
          {RoutersTable.map((v, i) => {
            return <Route path={v.path} element={v.element} key={i}></Route>
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
export default ROUTER
