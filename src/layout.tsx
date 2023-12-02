import React, { useState } from 'react'
import {
  PieChartOutlined,
  HomeOutlined,
  MessageOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Layout, Menu } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import MapContainer from './pages/homePage/desktop/MapContainer'

const { Header, Content, Sider } = Layout

// 定义导航菜单元素
type MenuItem = Required<MenuProps>['items'][number]
function getItem (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode
): MenuItem {
  return {
    key,
    icon,
    label
  } satisfies MenuItem
}

// 导航选项
const items: MenuItem[] = [
  getItem('主页', 'home', <HomeOutlined />),
  getItem('数据展示', 'data', <PieChartOutlined />),
  getItem('设备消息', 'msg', <MessageOutlined />)
]

const App: React.FC = () => {
  // 路由
  const navigate = useNavigate()
  const location = useLocation()

  const [collapsed, setCollapsed] = useState(true) // 导航栏是否展开

  // DOM
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: 0 }} >
        <h1
          style={{
            color: '#fff',
            marginLeft: 20
          }}
        >物联网平台</h1>
      </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ backgroundColor: '#fff' }}
        >
          <Menu
            theme="light"
            selectedKeys={[location.pathname.substring(1)]}
            mode="inline"
            items={items}
            onSelect={({ key }) => { navigate(key) }}
          />
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => { setCollapsed(!collapsed) }}
            style={{
              fontSize: '16px',
              width: '100%',
              height: 64,
              position: 'absolute',
              bottom: 0
            }}
          />
        </Sider>
        <Content style={{ height: '100%', width: '100%' }}>
          <MapContainer />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
