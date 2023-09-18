import React, { useState } from 'react'
import {
  PieChartOutlined,
  HomeOutlined,
  MessageOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } satisfies MenuItem
}

const items: MenuItem[] = [
  getItem('主页', 'Home', <HomeOutlined />),
  getItem('数据展示', 'Data', <PieChartOutlined />),
  getItem('设备消息', 'Msg', <MessageOutlined />)
]

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

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
          onCollapse={(value) => { setCollapsed(value) }}
          style={{ backgroundColor: '#fff' }}
        >
          <Menu theme="light" defaultSelectedKeys={['Home']} mode="inline" items={items} />
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
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            Bill is a cat.
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
