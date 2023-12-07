import React, { useState } from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Modal, Popconfirm } from 'antd'
import { useAppSelector } from '@/hooks/reduxHooks'
import useImageUrl from '@/hooks/useImgHooks'

const App: React.FC = () => {
  const [showUser, setShowUser] = useState(false)

  const { username } = useAppSelector(state => state.user)

  const imageUrl = useImageUrl()

  const handleLogout = (): void => {
    setShowUser(false)
  }

  const handleCancel = (): void => {
    setShowUser(false)
  }

  // DOM
  return (
    <>
      <h1
        style={{
          color: '#fff',
          marginLeft: 20,
          display: 'inline-block'
        }}
      >物联网平台</h1>
      <div style={{ display: 'inline-flex', position: 'absolute', right: 50 }}>
        <img
          src={imageUrl.getUrl('/images/head.png')}
          style={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            marginTop: 7
          }} />
        <Button type="link" onClick={() => { setShowUser(true) } }>
            <h3
                style={{
                  color: '#fff',
                  fontSize: 24,
                  marginTop: 7
                }}
            >{username}xxx</h3>
        </Button>
        <Modal
            title="用户信息"
            open={showUser}
            onCancel={handleCancel}
            style={{ right: 20 }}
            footer={[
                <Button key="cancel" type="primary" onClick={handleCancel}>关闭</Button>,
                <Popconfirm
                    key="logout"
                    title="请确定退出登录"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    okText="确定"
                    cancelText="取消"
                    onConfirm={handleLogout}
                >
                    <Button danger type="primary">退出登录</Button>
                </Popconfirm>
            ]}
        >
            <p>用户名：{username}</p>
            <p>组织：杭州电子科技大学</p>
        </Modal>
      </div>
    </>
  )
}

export default App
