import { Breadcrumb, Layout, Dropdown, Button } from 'antd'
import React, { useMemo, useState } from 'react'
import RoutersTable from '../../router/router'
import NavMenu from '../navMenu'
import logo from '../../logo.svg'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const { Header, Content, Footer, Sider } = Layout

type PropsType = {
  children: JSX.Element
}

const App: React.FC<PropsType> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  // 导航路由信息
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        className='site-layout-background'
        style={{
          padding: '0 50px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <div className='left' style={{ color: '#fff' }}>
          <img src={logo} alt='' style={{ height: 40 }} />
          <span>后端管理系统</span>
        </div>
      </Header>
      <Layout className='site-layout'>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <NavMenu routes={RoutersTable}></NavMenu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>©2023 租房后台管理系统 </Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
