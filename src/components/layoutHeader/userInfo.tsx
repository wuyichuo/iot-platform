import React from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Modal, Popconfirm } from 'antd'
import { useStorage } from '@/hooks/storageHooks'

interface UserInfoProps {
  show: boolean
  setShow: (show: boolean) => void
  handleLogout: () => void
}

const UserInfo: React.FC<UserInfoProps> = ({
  show,
  setShow,
  handleLogout
}) => {
  const storage = useStorage()

  const username = storage.get('user')
  const company = storage.get('company')

  // DOM
  return (
    <Modal
      title="用户信息"
      open={show}
      onCancel={() => { setShow(false) }}
      style={{ right: 20 }}
      footer={[
        <Button
          key="cancel"
          type="primary"
          onClick={() => { setShow(false) }}>
          关闭
        </Button>,
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
      <p>组织：{company}</p>
    </Modal>
  )
}

export default UserInfo
